import { baseUrl } from '../shared/baseUrl';

export const mapImageURL = (arr) => {
    return arr.map((item) => {
        return {
            ...item,
            img: baseUrl + item.img
        };
    });
};