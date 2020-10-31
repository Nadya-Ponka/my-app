import {
  CourseItem
} from '../models/course';

export const initialCourses: CourseItem[] = [new CourseItem(0, 'Video Course 1. Name tag 1', true, new Date('07/11/2021'), 88,
    `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,
	when an unknown printer took a galley of type and scrambled it to make a type specimen book.`),
  new CourseItem(1, 'Video Course 2. Name tag 2', false, new Date('11/07/2019'), -55,
		`Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" 
		(The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise 
		on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 
		"Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`),
  new CourseItem(2, 'Video Course 3. Name tag 3', false, new Date('10/20/2020'), 115,
    `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,
	when an unknown printer took a galley of type and scrambled it to make a type specimen book.`),
  new CourseItem(3, 'Video Course 4. Name tag 4', true, new Date('11/07/2020'), 45,
    `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,
	when an unknown printer took a galley of type and scrambled it to make a type specimen book.`)
];
