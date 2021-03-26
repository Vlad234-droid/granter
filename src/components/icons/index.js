import React from "react";

import "./icons.scss";

const IconInfo = () => {
  return (
    <svg
      width='12'
      height='12'
      viewBox='0 0 12 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='icon-info'
    >
      <path d='M6 0C5.21207 -1.17411e-08 4.43185 0.155195 3.7039 0.456723C2.97595 0.758251 2.31451 1.20021 1.75736 1.75736C1.20021 2.31451 0.758251 2.97595 0.456723 3.7039C0.155195 4.43185 0 5.21207 0 6C0 6.78793 0.155195 7.56815 0.456723 8.2961C0.758251 9.02405 1.20021 9.68549 1.75736 10.2426C2.31451 10.7998 2.97595 11.2417 3.7039 11.5433C4.43185 11.8448 5.21207 12 6 12C7.5913 12 9.11742 11.3679 10.2426 10.2426C11.3679 9.11742 12 7.5913 12 6C12 4.4087 11.3679 2.88258 10.2426 1.75736C9.11742 0.632141 7.5913 2.37122e-08 6 0ZM6.75 3.5C6.75 3.69878 6.67104 3.88942 6.53048 4.02998C6.38992 4.17054 6.19928 4.2495 6.0005 4.2495C5.80172 4.2495 5.61108 4.17054 5.47052 4.02998C5.32996 3.88942 5.251 3.69878 5.251 3.5C5.251 3.30135 5.32991 3.11084 5.47038 2.97038C5.61084 2.82991 5.80135 2.751 6 2.751C6.19865 2.751 6.38916 2.82991 6.52962 2.97038C6.67009 3.11084 6.749 3.30135 6.749 3.5H6.75ZM6 5C6.13261 5 6.25979 5.05268 6.35355 5.14645C6.44732 5.24021 6.5 5.36739 6.5 5.5V8.5C6.5 8.63261 6.44732 8.75979 6.35355 8.85355C6.25979 8.94732 6.13261 9 6 9C5.86739 9 5.74021 8.94732 5.64645 8.85355C5.55268 8.75979 5.5 8.63261 5.5 8.5V5.5C5.5 5.36739 5.55268 5.24021 5.64645 5.14645C5.74021 5.05268 5.86739 5 6 5Z' />
    </svg>
  );
};

const IconDelete = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      className='icon-delete'
    >
      <g fill='none' fillRule='evenodd'>
        <g className='icon-delete--fill'>
          <g>
            <path
              d='M11.848 15.797c.545 0 .987-.442.987-.987V6.911c0-.545-.442-.987-.987-.987-.545 0-.988.442-.988.987v7.899c0 .545.443.987.988.987zm-5.924 0c.545 0 .988-.442.988-.987V6.911c0-.545-.443-.987-.988-.987-.545 0-.987.442-.987.987v7.899c0 .545.442.987.987.987zm-2.962 1.975H14.81V3.95H2.962v13.823zM16.784 1.975h-2.961V.987c0-.545-.443-.987-.988-.987H4.937c-.545 0-.988.442-.988.987v.988H.987c-.546 0-.987.442-.987.987 0 .545.441.987.987.987v13.823c0 1.09.884 1.974 1.975 1.974H14.81c1.09 0 1.974-.883 1.974-1.974V3.95c.545 0 .988-.442.988-.987 0-.545-.443-.987-.988-.987zM8.886 15.797c.545 0 .987-.442.987-.987V6.911c0-.545-.442-.987-.987-.987-.545 0-.987.442-.987.987v7.899c0 .545.442.987.987.987z'
              transform='translate(-854 -400) translate(854 400) translate(3 2)'
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

const IconShare = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      className='icon-share'
    >
      <g fill='none' fillRule='evenodd'>
        <g>
          <g>
            <path
              d='M0 0L24 0 24 24 0 24z'
              transform='translate(-1240 -268) translate(1240 268)'
            />
            <path
              className='icon-share--fill'
              d='M17.333 15.666c-.675 0-1.28.27-1.742.693l-6.338-3.733c.045-.207.08-.414.08-.63 0-.216-.035-.423-.08-.63L15.52 7.67c.48.45 1.111.729 1.813.729 1.476 0 2.667-1.206 2.667-2.7C20 4.206 18.809 3 17.333 3c-1.475 0-2.666 1.205-2.666 2.699 0 .216.035.423.08.63L8.48 10.026c-.48-.45-1.111-.729-1.813-.729C5.19 9.297 4 10.503 4 11.996c0 1.493 1.191 2.699 2.667 2.699.702 0 1.333-.28 1.813-.729l6.329 3.742c-.045.19-.071.387-.071.585 0 1.449 1.164 2.627 2.595 2.627 1.431 0 2.596-1.178 2.596-2.627 0-1.448-1.165-2.627-2.596-2.627zm0-10.867c.49 0 .89.405.89.9s-.4.9-.89.9c-.489 0-.889-.405-.889-.9s.4-.9.89-.9zM6.667 12.896c-.49 0-.89-.405-.89-.9s.4-.9.89-.9c.489 0 .889.405.889.9s-.4.9-.89.9zm10.666 6.315c-.489 0-.889-.405-.889-.9s.4-.9.89-.9c.488 0 .888.405.888.9s-.4.9-.889.9z'
              transform='translate(-1240 -268) translate(1240 268)'
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

const IconPause = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      className='icon-pause'
    >
      <g fill='none' fillRule='evenodd'>
        <g>
          <g>
            <path
              d='M0 0L24 0 24 24 0 24z'
              transform='translate(-1288 -268) translate(1288 268)'
            />
            <path
              className='icon-pause--fill'
              d='M6 19h4V5H6v14zm8-14v14h4V5h-4z'
              transform='translate(-1288 -268) translate(1288 268)'
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

const IconPlay = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      className='icon-play'
    >
      <g fill='none' fillRule='evenodd'>
        <g>
          <g>
            <path
              d='M0 0L24 0 24 24 0 24z'
              transform='translate(-1288 -220) translate(1288 220)'
            />
            <path
              className='icon-play--fill'
              d='M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2V6z'
              transform='translate(-1288 -220) translate(1288 220)'
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

const IconClose = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      className='icon-close'
    >
      <defs>
        <filter id='ueyyoz5sma'>
          <feColorMatrix
            in='SourceGraphic'
            values='0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0 0.235294 0 0 0 1.000000 0'
          />
        </filter>
      </defs>
      <g fill='none' fillRule='evenodd'>
        <g>
          <g>
            <g
              //filter='url(#ueyyoz5sma)'
              transform='translate(-957 -24) translate(933) translate(24 24)'
            >
              <path d='M0 0L24 0 24 24 0 24z' />
              <path
                className='icon-close--fill'
                fillRule='nonzero'
                d='M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z'
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

const IconWarning = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
    >
      <g fill='none' fillRule='evenodd'>
        <g>
          <g>
            <g>
              <path
                d='M0 0L24 0 24 24 0 24z'
                transform='translate(-992 -168) translate(974 144) translate(18 24)'
              />
              <path
                fill='#F22245'
                fillRule='nonzero'
                d='M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z'
                transform='translate(-992 -168) translate(974 144) translate(18 24)'
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

const IconCloseGrey = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 16 16'
    >
      <g fill='none' fillRule='evenodd'>
        <g>
          <g>
            <g transform='translate(-1410 -16) translate(974 8) translate(436 8)'>
              <path d='M0 0L16 0 16 16 0 16z' />
              <circle cx='8' cy='8' r='8' fill='#BABAC3' />
              <path
                fill='#FFF'
                d='M11.823 4.184c-.237-.237-.62-.237-.856 0L8 7.144 5.033 4.177c-.237-.236-.619-.236-.856 0-.236.237-.236.62 0 .856L7.144 8l-2.967 2.967c-.236.237-.236.619 0 .856.237.236.62.236.856 0L8 8.856l2.967 2.967c.237.236.619.236.856 0 .236-.237.236-.62 0-.856L8.856 8l2.967-2.967c.23-.23.23-.619 0-.85z'
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

const IconStar = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='22'
      viewBox='0 0 24 22'
      className='icon-star'
    >
      <g fill='none' fillRule='evenodd'>
        <g className='icon-star__fill'>
          <path
            d='M1042 1292.13l3.195 6.473 7.143 1.038-5.169 5.039 1.22 7.114-6.389-3.359-6.39 3.36 1.22-7.115-5.168-5.04 7.143-1.037 3.195-6.473z'
            transform='translate(-1030 -1291)'
          />
        </g>
      </g>
    </svg>
  );
};

const IconSort = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 16 16'
      className='icon-sort'
    >
      <g fill='none' fillRule='evenodd'>
        <g>
          <g>
            <path
              d='M0 0L16 0 16 16 0 16z'
              transform='translate(-390 -180) translate(390 180)'
            />
            <path
              className='up'
              fillRule='nonzero'
              d='M5.86 5.117l1.683 1.692c.253.255.663.255.916 0l1.683-1.692C10.552 4.705 10.26 4 9.681 4H6.314c-.578 0-.864.705-.455 1.117z'
              transform='translate(-390 -180) translate(390 180) matrix(1 0 0 -1 0 11)'
            />
            <path
              className='down'
              fillRule='nonzero'
              d='M5.86 10.117l1.683 1.692c.253.255.663.255.916 0l1.683-1.692C10.552 9.705 10.26 9 9.681 9H6.314c-.578 0-.864.705-.455 1.117z'
              transform='translate(-390 -180) translate(390 180)'
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

const IconEdit = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      className='icon-edit'
    >
      <g fill='none' fillRule='evenodd'>
        <g>
          <g>
            <g>
              <path
                d='M0 0L24 0 24 24 0 24z'
                transform='translate(-1256 -394) translate(357 378) translate(899 16)'
              />
              <path
                className='icon-edit--fill'
                d='M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h4c.55 0 1-.45 1-1s-.45-1-1-1H5c-1.11 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55-.45 1-1 1zM14 4c0 .55.45 1 1 1h2.59l-9.13 9.13c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L19 6.41V9c0 .55.45 1 1 1s1-.45 1-1V3h-6c-.55 0-1 .45-1 1z'
                transform='translate(-1256 -394) translate(357 378) translate(899 16)'
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

const IconEditPen = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 16 16'
      className='icon-edit'
    >
      <g fill='none' fillRule='evenodd'>
        <g>
          <g>
            <path
              d='M0 0L16 0 16 16 0 16z'
              transform='translate(-552 -192) translate(552 192)'
            />
            <path
              className='icon-edit--fill'
              d='M2 11.64v2.027c0 .186.147.333.333.333H4.36c.087 0 .173-.033.233-.1l7.28-7.273-2.5-2.5L2.1 11.4c-.067.067-.1.147-.1.24zm11.807-6.947c.26-.26.26-.68 0-.94l-1.56-1.56c-.26-.26-.68-.26-.94 0l-1.22 1.22 2.5 2.5 1.22-1.22z'
              transform='translate(-552 -192) translate(552 192)'
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

const IconLogOut = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      className='icon-logout'
    >
      <g fill='none' fillRule='evenodd' opacity='.8'>
        <g>
          <g>
            <g>
              <g>
                <path
                  d='M0 0H24V24H0z'
                  transform='translate(-35 -706) translate(35 706) matrix(-1 0 0 1 24 0)'
                />
                <path
                  d='M0 0H24V24H0z'
                  transform='translate(-35 -706) translate(35 706) matrix(-1 0 0 1 24 0)'
                />
              </g>
              <path
                className='icon-edit--fill'
                d='M10.3 7.7c-.39.39-.39 1.01 0 1.4l1.9 1.9H3c-.55 0-1 .45-1 1s.45 1 1 1h9.2l-1.9 1.9c-.39.39-.39 1.01 0 1.4.39.39 1.01.39 1.4 0l3.59-3.59c.39-.39.39-1.02 0-1.41L11.7 7.7c-.39-.39-1.01-.39-1.4 0zM20 19h-7c-.55 0-1 .45-1 1s.45 1 1 1h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-7c-.55 0-1 .45-1 1s.45 1 1 1h7v14z'
                transform='translate(-35 -706) translate(35 706) matrix(-1 0 0 1 24 0)'
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export {
  IconInfo,
  IconDelete,
  IconEdit,
  IconShare,
  IconPause,
  IconPlay,
  IconClose,
  IconWarning,
  IconCloseGrey,
  IconStar,
  IconSort,
  IconEditPen,
  IconLogOut,
};
