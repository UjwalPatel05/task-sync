"use client";

import { ListWithCards } from "@/types";
import { List } from "@prisma/client";
import React, { useEffect, useState } from "react";
import ListForm from "./list-form";
import ListItem from "./list-item";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { toast } from "sonner";
import { updateCardOrder } from "@/actions/update-card-order";

interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  const {execute: executeUpdateListOrder} = useAction(updateListOrder,{
    onSuccess: () => {
      toast.success("List reordered");
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const {execute: executeUpdateCardOrder} = useAction(updateCardOrder,{
    onSuccess: () => {
      toast.success("Card reordered");
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: any) => {

    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    // If the source and destination are the same
    // if dropped at the same position (card or list)

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If the user is dragging a list

    if (type === "list") {
      
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => {
          return {
            ...item,
            order: index,
          };
        }
      );
      setOrderedData(items);
      
      executeUpdateListOrder({items, boardId})
    }

    // If the user is dragging a card

    if (type === "card") {

      let newOrderedData = [...orderedData];

      // finding the source list and destination list

      const sourceList = newOrderedData.find(list => list.id === source.droppableId);
      const destinationList = newOrderedData.find(list => list.id === destination.droppableId);

      if(!sourceList || !destinationList) return;

      // check if cards exist in both lists

      if(!sourceList.cards) sourceList.cards = [];
      if(!destinationList.cards) destinationList.cards = [];

      // Moving card in the same list

      if(source.droppableId === destination.droppableId) {  
        const reorderedCards = reorder(sourceList.cards, source.index, destination.index);          
        reorderedCards.forEach((card, index) => {
          card.order = index;
        });
        sourceList.cards = reorderedCards;
        setOrderedData(newOrderedData);
        executeUpdateCardOrder({boardId, items: reorderedCards})
      }else{
        // Moving card from one list to another
  
        // removing card from the source list
        const [removedCard] = sourceList.cards.splice(source.index, 1);

        // assign the new listId to the card
        removedCard.listId = destination.droppableId;

        // adding card to the destination list
        destinationList.cards.splice(destination.index, 0, removedCard);

        // reordering the cards in the source list
        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });

        // reordering the cards in the destination list
        destinationList.cards.forEach((card, index) => {
          card.order = index;
        });

        setOrderedData(newOrderedData);

        executeUpdateCardOrder({
          boardId,
          items: destinationList.cards,
        })
      }
    }


  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => {
              return <ListItem key={list.id} data={list} index={index} />;
            })}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;
