import { v4 as uuidv4 } from "uuid";

// Base Structure
const data = [
    {
        id: uuidv4(),
        
        title: "To Do",
        cards: [
            {
                id: uuidv4(),
                title: "Card 1",
                labels:[
                    {
                        text: "backend",
                        color: 'lightgreen'
                    }
                ],
                description: "blah blah blah",
                assignedUser: []
            },
            {
                id: uuidv4(),
                title: "Card 2",
                labels:[
                    {
                        text: "Cypress",
                        color: 'lightblue'
                    }
                ],
                description: "blah blah blah",
                assignedUser: []
            }
        ]
    }
]

export default data;