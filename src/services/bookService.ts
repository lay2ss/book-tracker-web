import axios from "axios";
import { api } from "./api";

const API_BASE_URL = import.meta.env.VITE_API_GOOGLE;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

interface BookSearchResult {
  id: string;
  title: string;
  authors: string[];
  coverImage: string | null;
  description: string | null;
  categories: string | null;
  pageCount: number | null;
  publishedYear: number | null;
}

export const searchBooks = async (query: string): Promise<BookSearchResult[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/volumes`, {
      params: {
        q: query,
        maxResults: 10,
        key: API_KEY
      }
    });

    if (!response.data.items) {
      return [];
    }

    return response.data.items.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title || 'Unknown Title',
      authors: item.volumeInfo.authors || ['Unknown Author'],
      coverImage: item.volumeInfo.imageLinks?.thumbnail || null,
      description: item.volumeInfo.description || null,
      categories: item.volumeInfo.categories || "Unknown Genre",
      pageCount: item.volumeInfo.pageCount || 0,
      publishedYear: item.volumeInfo.publishedDate ? item.volumeInfo.publishedDate.substring(0, 4) : 'N/A'
    }));
  } catch (error) {
    console.error('Error searching books:', error);
    throw new Error('Failed to search books');
  }
};

export const getBookById = async (bookId: string): Promise<BookSearchResult | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/volumes/${bookId}`, {
      params: {
        key: API_KEY
      }
    });
    const item = response.data;

    return {
      id: item.id,
      title: item.volumeInfo.title || 'Unknown Title',
      authors: item.volumeInfo.authors || ['Unknown Author'],
      coverImage: item.volumeInfo.imageLinks?.thumbnail || null,
      description: item.volumeInfo.description || null,
      categories: item.volumeInfo.categories || "Unknown Genre",
      pageCount: item.volumeInfo.pageCount || 0,
      publishedYear: item.volumeInfo.publishedDate ? item.volumeInfo.publishedDate.substring(0, 4) : 'N/A'
    };
  } catch (error) {
    console.error('Error getting book details:', error);
    return null;
  }
};

// add book
export const addBook = async (
  book: BookSearchResult, 
  status: string, 
  rating: number, 
  comment: string,
  readMonth: number, 
  readYear: number,
  currentPage: number,
  isFavorite: boolean, 
  collectionsIds: string[]) => {
  try {

    const authorString = book.authors && book.authors.length > 0 
      ? book.authors.join(", ") 
      : "Unknown Author";

    const response = await api.post('/api/books/', {
      externalId: book.id,
      title: book.title,
      author: authorString,
      coverImage: book.coverImage,
      status: status,
      rating: rating,
      comment: comment,
      readMonth: readMonth + 1,
      readYear: readYear,
      currentPage: currentPage,
      totalPage: book.pageCount,
      isFavorite: isFavorite || false,
      collectionsIds
    });
    return response.data;
  } catch (error) {
    console.error('Add book error:', error);
    throw error;
  }
};

// update book
export const updateBook = async (
  status: string, 
  rating: number, 
  comment: string,
  readMonth: number, 
  readYear: number,
  currentPage: number,
  dbId: any
) => {
  try {
    const response = await api.patch(`/api/books/${dbId}`, {
      status: status,
      rating: rating,
      comment: comment,
      readMonth: readMonth + 1,
      readYear: readYear,
      currentPage: currentPage,
    });
    return response.data;
  } catch (error) {
    console.error('Update book error:', error);
    throw error;
  }
};

//get books
export const getBooks = async () => {
  try {
    const response = await api.get('/api/books/');
    return response.data; 
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

//get book by id
export const getBookByDbId = async (dbId: any) => {
  try {
    const response = await api.get(`/api/books/${dbId}`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
};

//delete book
export const deleteBook = async (dbId: any) => {
  try {
    const response = await api.delete(`/api/books/${dbId}`);
    return response.data; 
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};

//create collection
export const createCollection = async (name: string) => {
  try {
    const response = await api.post("/api/collections/", {name: name});
    return response.data; 
  } catch (error) {
    console.error('Error creating collection:', error);
    throw error;
  }
};

//get collections
export const getCollections = async () => {
  try {
    const response = await api.get('/api/collections/');
    return response.data; 
  } catch (error) {
    console.error('Error fetching collections:', error);
    throw error;
  }
};

//get collection by id
export const getCollectionById = async (id: any) => {
  try {
    const response = await api.get(`/api/collections/${id}`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching collection:', error);
    throw error;
  }
};

//add book to collection
export const addBookToCollection = async (bookId: any, id: any) => {
  try {
    const response = await api.post(`/api/collections/${id}/add-book`, {bookId: bookId});
    return response.data; 
  } catch (error) {
    console.error('Error adding book to collection:', error);
    throw error;
  }
};

//remove book from collection
export const removeBookFromCollection = async (bookId: any, id: any) => {
  try {
    const response = await api.post(`/api/collections/${id}/remove-book`, {bookId: bookId});
    return response.data; 
  } catch (error) {
    console.error('Error removing book from collection:', error);
    throw error;
  }
};