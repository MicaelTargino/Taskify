"use client"

import { DragDropContext, Droppable } from "@hello-pangea/dnd"

import { ListWithCards } from "@/types"
import { ListForm } from "./ListForm"
import { useEffect, useState } from "react"
import { ListItem } from "./ListItem"
interface ListContainerProps {
    data: ListWithCards[],
    boardId: string
}

export const ListContainer = ({
    data,
    boardId
}: ListContainerProps) => {
    const [orderedData, setOrderedData] = useState(data);
    
    useEffect(() => {
        setOrderedData(data)
    }, [data])



    return (
        <DragDropContext onDragEnd={() => {}}>
            <Droppable droppableId="lists" type="lists" direction="horizontal">
                {(provided) => (
                <ol {...provided.droppableProps} ref={provided.innerRef} className="flex gap-x-3 h-full">
                    {orderedData.map((list, index) => {
                        return (

                            <ListItem key={list.id} index={index} data={list}></ListItem>
                        )
                    })}
                    {provided.placeholder}
                    <ListForm />
                    <div className="flex-shrink-0 w-1" />
                </ol>
                )}
            </Droppable>
        </DragDropContext>
    )
}