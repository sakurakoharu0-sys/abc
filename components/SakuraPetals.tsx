import React from 'react';

const Petal: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <div className="petal" style={style}></div>
);

const SakuraPetals: React.FC = () => {
    const petals = Array.from({ length: 15 }).map((_, i) => {
        const style = {
            left: `${Math.random() * 100}vw`,
            width: `${Math.random() * 8 + 7}px`,
            height: `${Math.random() * 5 + 5}px`,
            animationDuration: `${Math.random() * 5 + 8}s`,
            animationDelay: `${Math.random() * 7}s`,
        };
        return <Petal key={i} style={style} />;
    });
    return <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">{petals}</div>;
};

export default SakuraPetals;
