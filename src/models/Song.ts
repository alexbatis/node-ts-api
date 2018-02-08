interface ISong {
    title?: string;
    seconds?: number;
    artist?: string;
}
export class Song {
    public title: String;
    public seconds: number;
    public artist: String;

    constructor(song?: ISong) {
        // tslint:disable-next-line:no-null-keyword
        this.title = song && song.title || null;
        // tslint:disable-next-line:no-null-keyword
        this.seconds = song && song.seconds || null;
        // tslint:disable-next-line:no-null-keyword
        this.artist = song && song.artist || null;
    }


    public idk(y: string) {
        return y;
    }
}