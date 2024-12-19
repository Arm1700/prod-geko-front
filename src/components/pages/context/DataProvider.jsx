import React, { createContext, useReducer, useEffect, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import axios from 'axios';

// Создаем контекст для данных
export const DataContext = createContext();
export const BASE_URL = "https://gekoeducation.com";
// export const BASE_URL = "http://127.0.0.1:8000/";

// Определяем начальное состояние
const initialState = {
    courses: [],
    events: [],
    categories: [],
    reviews: [],
    lessonInfo: [],
    teams: [],
    loading: true,
    error: null,
};

// Редуктор для обновления состояния
const dataReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return { ...state, categories: action.payload };
        case 'SET_COURSES':
            return { ...state, courses: action.payload };
        case 'SET_EVENTS':
            return { ...state, events: action.payload };
        case 'SET_REVIEWS':
            return { ...state, reviews: action.payload };
        case 'SET_LESSON_INFO':
            return { ...state, lessonInfo: action.payload };
        case 'SET_TEAMS':
            return { ...state, teams: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

// Custom hook for managing loading and error states
const useLoadingError = (dispatch) => {
    const setLoading = (isLoading) => dispatch({ type: 'SET_LOADING', payload: isLoading });
    const setError = (error) => dispatch({ type: 'SET_ERROR', payload: error });
    return { setLoading, setError };
};

export const DataProvider = ({ children }) => {
    const { i18n } = useTranslation();
    const language = i18n.language;

    const [state, dispatch] = useReducer(dataReducer, initialState);
    const { setLoading, setError } = useLoadingError(dispatch);

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/categories/?language=${language}`);
            dispatch({ type: 'SET_CATEGORIES', payload: response.data });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [language, setLoading, setError]);

    const fetchCourses = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/popular_courses/?language=${language}`);
            dispatch({ type: 'SET_COURSES', payload: response.data });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [language, setLoading, setError]);

    const fetchEvents = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/events/?language=${language}`);
            dispatch({ type: 'SET_EVENTS', payload: response.data });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [language, setLoading, setError]);

    const fetchReviews = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/reviews/?language=${language}`);
            dispatch({ type: 'SET_REVIEWS', payload: response.data });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [language, setLoading, setError]);

    const fetchLessonInfo = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/lesson_info/?language=${language}`);
            dispatch({ type: 'SET_LESSON_INFO', payload: response.data });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [language, setLoading, setError]);

    const fetchTeams = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/team/?language=${language}`);
            dispatch({ type: 'SET_TEAMS', payload: response.data });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [language, setLoading, setError]);

    const getCategoriesById = (id) => {
        const parsedId = parseInt(id);
        return state.categories.find(course => course.id === parsedId);
    };

    const getCoursesById = (id) => {
        const parsedId = parseInt(id);
        return state.courses.find(course => course.id === parsedId);
    };

    const getCoursesByCategory = (id) => {
        const parsedId = parseInt(id);
        return state.courses.filter(course => course.category.id === parsedId);
    };

    const getEventById = (id) => {
        const parsedId = parseInt(id);
        return state.events.find(event => event.id === parsedId);
    };

    const getImageUrl = (image) => {
        return image && typeof image === 'string'
            ? image.startsWith('https')
                ? image
                : `${BASE_URL}${image}`
            : 'https://eduma.thimpress.com/wp-content/uploads/2022/07/thumnail-cate-7-170x170.png';
    };

    const renderBullet = (index, className) => {
        return `<span class="${className}" style="background-color: orange;"></span>`;
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await Promise.all([
                    fetchCategories(),
                    fetchCourses(),
                    fetchEvents(),
                    fetchReviews(),
                    fetchLessonInfo(),
                    fetchTeams(),
                ]);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [language]);

    if (state.loading || state.error) {
        return null;
    }

    return (
        <DataContext.Provider value={{
            getCoursesByCategory,
            getCategoriesById,
            getCoursesById,
            getEventById,
            getImageUrl,
            renderBullet,
            fetchCategories,
            fetchCourses,
            fetchEvents,
            fetchReviews,
            fetchLessonInfo,
            fetchTeams,
            categories: state.categories,
            events: state.events,
            courses: state.courses,
            reviews: state.reviews,
            lessonInfo: state.lessonInfo,
            teams: state.teams,
            error: state.error,
            loading: state.loading,
        }}>
            {children}
        </DataContext.Provider>
    );
};
