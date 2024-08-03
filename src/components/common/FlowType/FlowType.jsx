import React, { useEffect } from 'react';

const FlowType = ({ children, elementRef, options }) => {
  useEffect(() => {
    const element = elementRef.current;

    const settings = {
      maximum: 9999,
      minimum: 1,
      maxFont: 9999,
      minFont: 1,
      fontRatio: 35,
      ...options,
    };

    const changes = (el) => {
      const elw = el.clientWidth;
      const width = elw > settings.maximum ? settings.maximum : elw < settings.minimum ? settings.minimum : elw;
      const fontBase = width / settings.fontRatio;
      const fontSize = fontBase > settings.maxFont ? settings.maxFont : fontBase < settings.minFont ? settings.minFont : fontBase;
      el.style.fontSize = fontSize + 'px';
    };

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        changes(entry.target);
      }
    });

    observer.observe(element);

    // Initial font size setting
    changes(element);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};

export default FlowType;
