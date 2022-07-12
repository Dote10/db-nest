export class PostInfo {
  public postCount: number;
  public likeCount: number;

  constructor(postCount: number, likeCount: number) {
    this.postCount = postCount;
    this.likeCount = likeCount;
  }

  public getPostCount(): number {
    return this.postCount;
  }

  public setPostCount(postCount: number): void {
    this.postCount = postCount;
  }

  public getLikeCount(): number {
    return this.likeCount;
  }

  public setLikeCount(likeCount: number): void {
    this.likeCount = likeCount;
  }
}
