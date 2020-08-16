import allUsers from '../model/users.json'
let users= allUsers;

export const getAllUsers=(req, res)=>{
    res.send(users);
};

export const findUserById=(req, res)=>{
    const {id}=req.params;
    const user= users.find((us)=>us.user_id===id);
   res.send(user);
};

export const updateUser=(req, res)=>{
    const {id} = req.params;
    const {first_name, last_name, role}= req.body;
    const myUser= users.find(p=>p.user_id==id );

    if(first_name){
        myUser.first_name=first_name;
    }
    if(last_name){
        myUser.last_name=last_name;
    }
    if(role){
        myUser.role=role;
      }

    res.send(users);
};

export const deleteUser=(req, res)=>{
    const {id} = req.params;
    users=users.filter((us)=>us.user_id !==id );
    res.send(users);
}