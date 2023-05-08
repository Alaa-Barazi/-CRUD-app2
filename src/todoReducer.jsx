export default function todoReducer(todos, action){
    switch (action.type) {
        case 'add': {
          return [
            ...todos,
            {
             id:action.id,
              name: action.name,
              done: false,
            },
          ];
        }
        case 'change': {
          return todos.map((t) => {
            if (t.id === action.task.id) {
              return action.task;
            } else {
              return t;
            }
          });
        }
        case 'update': {
            // let newItem=[];
            // for(let i=0;i<todos.length;i++){
            //     if(todos[i].id !=action.id)
            //         newItem.push(todos[i]);
            //         else
            //         newItem.push({id:todos[i].id,name:todos[i].name,done:!todos[i].done})
            // }
            // return newItem;
            return todos.map((t) => {
              if (t.id === action.id) {
                return { ...t, done: !t.done };
              } else {
                return t;
              }
            });
          }
        case 'set':{
           
            return action.items;
        }
        case 'delete': {
            return todos.filter((t) => t.id !== action.id);
        }
        default: {
          throw Error('Unknown action: ' + action.type);
        }
      }
}