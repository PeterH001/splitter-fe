export interface GroupDTO{
    id: number;
    name: string;
    members: {
        id: number;
        username: string
    }[]
}