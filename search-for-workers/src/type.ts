export interface Worker {
  id: number;
  name: string;
  avatar: string;
  tag: string;
  position: string;
}

export interface WorkersState {
  workers: Worker[];
  status: 'ok' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
