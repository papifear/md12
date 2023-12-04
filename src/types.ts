export interface Item {
    id: number;
    title: string;
    description: string;
    author: string;
    imgLink: string;
    dateAdded: string;
}
  
export interface EditModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    itemId: number;
    fetchData: () => void;
}

export interface ItemListProps {
    items: Item[];
    fetchData: () => void;
}

export interface AddItemFormProps {
    fetchData: () => void;
}

export const apiUrl = 'http://localhost:3005/items';