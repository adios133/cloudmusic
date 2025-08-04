import request from "@/utils/request";

export function getFm(): AxiosResponseFormat<any> {
  const timestamp = +new Date();
  return request({
    url: "/personal_fm",
    params: {
      timestamp
    }
  });
}
export function getMusicInfo(ids: string): AxiosResponseFormat<any> {
  return request({
    url: "/song/detail",
    params: {
      ids
    }
  });
}

export function likeSong(id: string, like: boolean): AxiosResponseFormat<any> {
  return request({
    url: "/like",
    params: {
      id,
      like
    }
  });
}
export function trashSong(id: string): AxiosResponseFormat<any> {
  return request({
    url: "/fm_trash",
    params: {
      id
    }
  });
}
