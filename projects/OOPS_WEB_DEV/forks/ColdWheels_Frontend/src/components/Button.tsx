import React from 'react';
interface IbuttonProps{
    canClick:Boolean;
    loading:Boolean;
    actionText:string;
}

export const Button : React.FC<IbuttonProps> =({
    canClick,
    loading,
    actionText,
}) => (
    <button className={ `btn ${canClick?"bg-black" :"bg-gray-300 pointer-events-none"}` }>
        {loading ?"loading":actionText}
        </button>
        );
