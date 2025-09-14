import uniqid from 'uniqid';

export default class List{
    constructor(){
        this.items = [];
    };

    deleteItem(id){
        //idというIDを持つ材料のインデックスを配列から探す
        const index = this.items.findIndex(el => el.id === id)
        //　そのインデックスの要素を配列から削除する
        this.items.splice(index, 1);
    }

    addItem(item){
        let newItem = {
            id: uniqid(),
            item
        };
        this.items.push(newItem);

        return newItem;
    };
};