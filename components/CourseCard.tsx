import React from 'react';
import { Star, Users, BookOpen } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-blue-800 uppercase tracking-wide">
          {course.category}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
          {course.title}
        </h3>
        
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-yellow-400 text-sm">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                fill={i < Math.floor(course.rating) ? "currentColor" : "none"} 
                className={i < Math.floor(course.rating) ? "" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 font-medium">({course.rating} / {course.reviewCount})</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Fiyat</span>
            <span className="text-lg font-bold text-[#263562]">₺{course.price.toLocaleString('tr-TR')}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-500 text-xs">
             <div className="flex items-center gap-1">
                <BookOpen size={14} />
                <span>{course.duration}</span>
             </div>
             <div className="flex items-center gap-1">
                <Users size={14} />
                <span>{course.students}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;