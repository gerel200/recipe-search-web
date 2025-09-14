export default class Likes{
    constructor(){
        this.readDataFromLocalStorage();
        if(!this.likes) this.likes = [];
    };

    addLike(id, title, publisher, img){
        const like = {id, title, publisher, img};
        this.likes.push(like);

        //save to storage
        this.saveDataToLocalStorage();
        return like;
    }

    deleteLike(id){
        //idというIDを持つLIKEのインデックスを配列から探す
        const index = this.likes.findIndex(el => el.id === id)
        //　そのインデックスの要素を配列から削除する
        this.likes.splice(index, 1);
        //delete from storage
        this.saveDataToLocalStorage();
    };

    isLiked(id){
        // if(this.likes.findIndex(el => el.id === id) === -1)return false;
        // else return true;

        return this.likes.findIndex(el => el.id === id) !== -1;
    };

    getNumberOfLikes(){
        return this.likes.lenght;
    };

    saveDataToLocalStorage(){
        localStorage.setItem("likes", JSON.stringify(this.likes));
    };

    readDataFromLocalStorage(){
        this.likes = JSON.parse(localStorage.getItem("likes"))
    }
}