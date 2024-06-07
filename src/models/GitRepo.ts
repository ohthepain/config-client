export class GitRepo {
    id:number;
    name:string;
    description:string;
    url:string;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.url = data.url;
    }
}
