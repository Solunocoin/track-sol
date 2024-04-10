'use client';

import { Copy, QuestionCircleFill } from 'react-bootstrap-icons';
import { Tooltip } from 'react-tooltip';

const InfoTip = ({ id, description, type = 'info' }: IInfoTip) => {
  return (
    <div
      style={{
        display: 'inline-block',
      }}
    >
      <Tooltip
        id={id}
        style={{
          width: '260px',
          backgroundColor: '#222742',
          borderRadius: '8px',
        }}
      >
        <div>
          <div>{description}</div>
        </div>
      </Tooltip>
      <a data-tooltip-id={id}>
        {type === 'info' ? (
          <QuestionCircleFill size={12} data-background-color="#222742" />
        ) : (
          <Copy
            height="13px"
            data-background-color="#222742"
            style={{ color: '#bcc2ed' }}
          />
        )}
      </a>
    </div>
  );
};

export default InfoTip;
