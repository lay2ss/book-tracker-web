import axios from "axios";

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