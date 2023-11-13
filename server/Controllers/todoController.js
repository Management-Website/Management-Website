const Todo= require('../Models/todoModel');


    const newTodo = async (req, res) => {

              const userID = req.user._id
            const formData = req.body;
        
            const newTodo = new Todo({
                title: formData.title,
                description: formData.description,
                duedate: formData.duedate,
                  user:userID
            });
            const todo = await newTodo.save();
            res.json(todo);
            console.log(formData);
        }




        const getAllTodos = async (req, res) => {
            const userID = req.user._id
            
            try {
                const todos = await Todo.find({ is_delete: false, user:userID});
                res.json(todos);
            } catch (error) {
                res.status(500).json({ error: 'Error fetching todos' });
            }
        };



        const updateTodoById = async (req, res) => {
            const todoId = req.params.id;
            const updatedTodoData = req.body;
            const userID = req.user._id; 
            try {
                const todo = await Todo.findByIdAndUpdate(todoId, updatedTodoData, { new: true,is_deleted:false,user:userID });
                if (!todo) {
                    return res.status(404).json({ error: 'Todo not found' });
                }
        
                // Update todo properties
                // todo.title = formData.title || todo.title;
                // todo.description = formData.description || todo.description;
                // todo.duedate = formData.duedate || todo.duedate;
        
                // Save the updated todo
                const updatedTodo = await todo.save();
                res.json(updatedTodo);
            } catch (error) {
                res.status(500).json({ error: 'Error updating todo by ID' });
            }
        };

        

        const inprogress = (req, res) => {
            const userID = req.user._id

            Todo.find({ is_delete: false,status: false,user:userID})
                .then((data) => {
                    res.json(data);
                })
                .catch((error) => {
                    res.status(500).json({ error: 'Internal Server Error' });
                });
        };




        const completed = (req, res) => {
            const userID = req.user._id
            Todo.find({ is_delete: false,status: true,user:userID})
                .then((data) => {
                    res.json(data);
                })
                .catch((error) => {
                    res.status(500).json({ error: 'Internal Server Error' });
                });
        };



        const deleteTodo = async (req, res) => {
            const userID = req.user._id
            try {
                const todoId = req.params.id;
                const updatedTodoData = req.body;

                updatedTodoData.is_delete = true;

                const todo = await Todo.findByIdAndUpdate(todoId, updatedTodoData, {
                    new: true,user:userID
                });

                const updatedTodo = await todo.save();

                res.json(updatedTodo);
            } catch (error) {
                res.status(500).json({ error: 'Failed to delete Order' });
            }
        };



        const updateTodostatus = async (req, res) => {
            const userID = req.user._id

            try {
                const todoId = req.params.id;


                const todo = await Todo.findOne({ _id: todoId, user: userID });

                if (!todo) {
                    return res.status(404).json({ error: 'Todo not found' });
                }


                todo.status = !todo.status;


                const updatedTodo = await todo.save();

                res.json(updatedTodo);
            } catch (error) {
                console.error('Error updating todo:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        };

module.exports = {
    newTodo,
    getAllTodos,
    updateTodoById,
    inprogress,
    completed,
    deleteTodo,
    updateTodostatus
};