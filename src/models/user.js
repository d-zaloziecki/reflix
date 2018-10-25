class UserModel{
constructor( name , color ){
    this.id = UserModel._currentID ++;
    this.name = name;
    this.rented = [];
    this.color = color;
    this.budget = 10;
}

}


UserModel._currentID = 1;
export default UserModel