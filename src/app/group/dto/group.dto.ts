export interface GroupDTO {
  id: number;
  name: string;
  simplify: boolean;
  members: {
    id: number;
    username: string;
  }[];
}
