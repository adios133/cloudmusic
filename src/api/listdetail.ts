import request from "@/utils/request";

export function getListDetail(id: string): AxiosResponseFormat<any> {
  return request({
    url: "/playlist/detail",
    params: {
      id
    }
  });
}
export class ListInfo {
  public coverUrl: string;
  public name: string;
  public id: string;
  public shareCount: number;
  public commentCount: number;
  public subscribedCount: number;
  constructor(playlist) {
    this.coverUrl = playlist.coverImgUrl;
    this.name = playlist.name;
    this.id = playlist.id;
    this.shareCount = playlist.shareCount;
    this.commentCount = playlist.commentCount;
    this.subscribedCount = playlist.subscribedCount;
  }
}
export class CreatorInfo {
  public avatar: string;
  public name: string;
  public uid: string;
  constructor(creator: any) {
    this.avatar = creator.avatarUrl;
    this.name = creator.nickname;
    this.uid = creator.userId;
  }
}
