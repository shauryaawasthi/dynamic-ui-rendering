import axios from "axios";
import type {
  UISchema,
  SaveUIRequest,
  SaveUIResponse,
  GetUIResponse,
  ListUIsResponse,
} from "../types/schema";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const uiApi = {
  saveUI: async (uiName: string, schema: UISchema): Promise<SaveUIResponse> => {
    const response = await api.post<SaveUIResponse>("/ui", {
      uiName,
      schema,
    } as SaveUIRequest);
    return response.data;
  },

  getUI: async (uiName: string): Promise<GetUIResponse> => {
    const response = await api.get<GetUIResponse>(`/ui/${uiName}`);
    return response.data;
  },

  listUIs: async (): Promise<ListUIsResponse> => {
    const response = await api.get<ListUIsResponse>("/ui");
    return response.data;
  },

  deleteUI: async (uiName: string): Promise<void> => {
    await api.delete(`/ui/${uiName}`);
  },
};

export default api;
