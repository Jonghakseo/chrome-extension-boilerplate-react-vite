// ErrorComponent.tsx
import React from 'react';

interface ErrorComponentProps {
  message?: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#ffebee', // Light red background
      borderRadius: '8px',
      border: '1px solid #ffcdd2', // Light red border
    },
    image: {
      width: '100px',
      height: '100px',
      marginBottom: '20px',
    },
    text: {
      fontSize: '16px',
      color: '#c62828', // Dark red text
    },
  };

  return (
    <div style={styles.container}>
      <img
        src={chrome.runtime.getURL('assets/error(1).png')} // Path to the error image
        alt="Error"
        style={styles.image}
      />
      <p style={styles.text}>
        {message || 'An error occurred. Please try again.'}
      </p>
    </div>
  );
};

export default ErrorComponent;