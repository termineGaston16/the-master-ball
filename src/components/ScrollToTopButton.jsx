import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Mostrar el botón cuando se desplaza hacia abajo 300px
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Desplazarse al tope de la página
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // para un desplazamiento suave
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <button onClick={scrollToTop} style={styles.button}>
          ↑
        </button>
      )}
    </div>
  );
};

const styles = {
  button: {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    padding: '10px 20px',
    fontSize: '20px',
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid red',
    borderRadius: '5px',
    cursor: 'pointer',
    zIndex: 1000,
  },
};

export default ScrollToTopButton;
