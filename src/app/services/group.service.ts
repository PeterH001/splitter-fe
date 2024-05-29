import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AdminGetGroupDTO,
  GetMyGroupsDTO,
  GroupDetailsDTO,
} from '../group/dto';
import { GroupDTO } from '../group/dto/group.dto';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private baseUrl: string = 'http://localhost:3000/group';
  constructor(private http: HttpClient) {}

  getAllGroups() {
    return this.http.get<AdminGetGroupDTO[]>(this.baseUrl);
  }

  getMyGroups() {
    return this.http.get<GetMyGroupsDTO[]>(this.baseUrl + '/mygroups');
  }
  getGroupById(id: number) {
    return this.http.get<GroupDTO>(this.baseUrl + `/${id}`);
  }
  getGroupDetailsById(id: number) {
    return this.http.get<GroupDetailsDTO>(this.baseUrl + `/${id}` + '/details');
  }
  getGroupMembersById(
    groupId: number
  ): Observable<{ id: number; username: string }[]> {
    const result = this.http.get<{ id: number; username: string }[]>(
      this.baseUrl + `/${groupId}` + '/members'
    );
    return result;
  }

  createGroup(
    createGroupData: Partial<{
      groupName: string | null;
      userIds: number[] | null;
    }>
  ) {
    return this.http.post(this.baseUrl, createGroupData);
  }

  updateGroupById(
    groupId: number,
    updateGroupData: Partial<{
      groupName: string | null;
      userIds: number[] | null;
    }>
  ) {
    return this.http.patch(this.baseUrl + `/${groupId}`, updateGroupData);
  }

  deleteGroupById(groupId: number) {
    return this.http.delete(this.baseUrl + `/${groupId}`);
  }

  removeUser(groupId: number, userId: number) {
    return this.http.patch(this.baseUrl + `/${groupId}/removeuser`, { id: userId });
  }
  
  leaveGroup(groupId: number) {
    return this.http.patch(this.baseUrl + `/${groupId}/leave`, null);
  }
}
