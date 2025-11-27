import { Octokit } from '@octokit/rest';
import { IStorageService, UIMetadata } from './storage.service';
import { UISchema } from '../../../shared/types';
import config from '../config/env';

export class GitHubStorageService implements IStorageService {
  private octokit: Octokit;
  private owner: string;
  private repo: string;
  private branch: string;

  constructor() {
    if (!config.github.token || !config.github.repo) {
      throw new Error('GitHub configuration is missing');
    }

    if (config.github.repo.includes('http://') ||
      config.github.repo.includes('https://') ||
      config.github.repo.includes('github.com')) {
      throw new Error(
        'Invalid GITHUB_REPO format. ' +
        'Expected format: "username/repository-name". ' +
        `Got: "${config.github.repo}". ` +
        'Please remove the URL and use only "username/repo-name"'
      );
    }

    this.octokit = new Octokit({
      auth: config.github.token,
    });

    // Clean up repo name - remove .git extension if present
    let repoPath = config.github.repo.trim();
    if (repoPath.endsWith('.git')) {
      console.warn(`Warning: Removing .git extension from GITHUB_REPO`);
      console.warn(`Before: ${repoPath}`);
      repoPath = repoPath.slice(0, -4);
      console.warn(`After: ${repoPath}`);
    }

    const [owner, repo] = repoPath.split('/');


    if (!owner || !repo) {
      throw new Error(
        'Invalid GITHUB_REPO format. ' +
        'Expected format: "username/repository-name". ' +
        `Got: "${config.github.repo}"`
      );
    }

    this.owner = owner;
    this.repo = repo;
    this.branch = config.github.branch;

    console.log(`GitHub storage initialized: ${this.owner}/${this.repo}`);
  }

  private getFilePath(uiName: string): string {
    return `schemas/${uiName}.json`;
  }

  async save(uiName: string, schema: UISchema): Promise<void> {
    const filePath = this.getFilePath(uiName);
    const content = JSON.stringify(
      {
        schema,
        createdAt: new Date().toISOString(),
      },
      null,
      2
    );

    try {
      const { data: existingFile } = await this.octokit.repos.getContent({
        owner: this.owner,
        repo: this.repo,
        path: filePath,
        ref: this.branch,
      });

      if ('sha' in existingFile) {
        await this.octokit.repos.createOrUpdateFileContents({
          owner: this.owner,
          repo: this.repo,
          path: filePath,
          message: `Update UI schema: ${uiName}`,
          content: Buffer.from(content).toString('base64'),
          sha: existingFile.sha,
          branch: this.branch,
        });
      }
    } catch (error: any) {
      if (error.status === 404) {
        await this.octokit.repos.createOrUpdateFileContents({
          owner: this.owner,
          repo: this.repo,
          path: filePath,
          message: `Create UI schema: ${uiName}`,
          content: Buffer.from(content).toString('base64'),
          branch: this.branch,
        });
      } else {
        throw error;
      }
    }
  }

  async get(uiName: string): Promise<{ schema: UISchema; createdAt?: string } | null> {
    const filePath = this.getFilePath(uiName);

    try {
      const { data } = await this.octokit.repos.getContent({
        owner: this.owner,
        repo: this.repo,
        path: filePath,
        ref: this.branch,
      });

      if ('content' in data) {
        const content = Buffer.from(data.content, 'base64').toString('utf-8');
        const parsed = JSON.parse(content);
        return {
          schema: parsed.schema,
          createdAt: parsed.createdAt,
        };
      }

      return null;
    } catch (error: any) {
      if (error.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async list(): Promise<UIMetadata[]> {
    try {
      const { data } = await this.octokit.repos.getContent({
        owner: this.owner,
        repo: this.repo,
        path: 'schemas',
        ref: this.branch,
      });

      if (!Array.isArray(data)) {
        return [];
      }

      const jsonFiles = data.filter(
        (file) => file.type === 'file' && file.name.endsWith('.json')
      );

      const metadata = await Promise.all(
        jsonFiles.map(async (file) => {
          const name = file.name.replace('.json', '');
          try {
            const result = await this.get(name);
            return {
              name,
              createdAt: result?.createdAt,
            };
          } catch {
            return { name };
          }
        })
      );

      return metadata.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return 0;
      });
    } catch (error: any) {
      if (error.status === 404) {
        return [];
      }
      throw error;
    }
  }

  async delete(uiName: string): Promise<void> {
    const filePath = this.getFilePath(uiName);

    try {
      const { data: existingFile } = await this.octokit.repos.getContent({
        owner: this.owner,
        repo: this.repo,
        path: filePath,
        ref: this.branch,
      });

      if ('sha' in existingFile) {
        await this.octokit.repos.deleteFile({
          owner: this.owner,
          repo: this.repo,
          path: filePath,
          message: `Delete UI schema: ${uiName}`,
          sha: existingFile.sha,
          branch: this.branch,
        });
      }
    } catch (error: any) {
      if (error.status === 404) {
        throw new Error('UI not found');
      }
      throw error;
    }
  }
}

