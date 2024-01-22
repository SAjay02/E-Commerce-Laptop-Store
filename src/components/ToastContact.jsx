import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';

const ToastContact = () => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  return (
    <>
      <Button variant="danger" ref={target} onClick={() => setShow(!show)}>
        Contact
      </Button>
      <Overlay target={target.current} show={show} placement="bottom">
        {({
          placement: _placement,
          arrowProps: _arrowProps,
          show: _show,
          popper: _popper,
          hasDoneInitialMeasure: _hasDoneInitialMeasure,
          ...props
        }) => (
          <div
            {...props}
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(255, 100, 100, 0.85)',
              padding: '2px 10px',
              color: 'white',
              borderRadius: 3,
              ...props.style,
            }}
          >
            Simple tooltip
          </div>
        )}
      </Overlay>
    </>
  )
}

export default ToastContact