import React from 'react';

import './icons.scss';

const IconInfo = () => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-info">
      <path d="M6 0C5.21207 -1.17411e-08 4.43185 0.155195 3.7039 0.456723C2.97595 0.758251 2.31451 1.20021 1.75736 1.75736C1.20021 2.31451 0.758251 2.97595 0.456723 3.7039C0.155195 4.43185 0 5.21207 0 6C0 6.78793 0.155195 7.56815 0.456723 8.2961C0.758251 9.02405 1.20021 9.68549 1.75736 10.2426C2.31451 10.7998 2.97595 11.2417 3.7039 11.5433C4.43185 11.8448 5.21207 12 6 12C7.5913 12 9.11742 11.3679 10.2426 10.2426C11.3679 9.11742 12 7.5913 12 6C12 4.4087 11.3679 2.88258 10.2426 1.75736C9.11742 0.632141 7.5913 2.37122e-08 6 0ZM6.75 3.5C6.75 3.69878 6.67104 3.88942 6.53048 4.02998C6.38992 4.17054 6.19928 4.2495 6.0005 4.2495C5.80172 4.2495 5.61108 4.17054 5.47052 4.02998C5.32996 3.88942 5.251 3.69878 5.251 3.5C5.251 3.30135 5.32991 3.11084 5.47038 2.97038C5.61084 2.82991 5.80135 2.751 6 2.751C6.19865 2.751 6.38916 2.82991 6.52962 2.97038C6.67009 3.11084 6.749 3.30135 6.749 3.5H6.75ZM6 5C6.13261 5 6.25979 5.05268 6.35355 5.14645C6.44732 5.24021 6.5 5.36739 6.5 5.5V8.5C6.5 8.63261 6.44732 8.75979 6.35355 8.85355C6.25979 8.94732 6.13261 9 6 9C5.86739 9 5.74021 8.94732 5.64645 8.85355C5.55268 8.75979 5.5 8.63261 5.5 8.5V5.5C5.5 5.36739 5.55268 5.24021 5.64645 5.14645C5.74021 5.05268 5.86739 5 6 5Z" />
    </svg>
  );
};

const IconClose = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="icon-close">
      <defs>
        <filter id="ueyyoz5sma">
          <feColorMatrix
            in="SourceGraphic"
            values="0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0 0.235294 0 0 0 1.000000 0"
          />
        </filter>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g>
          <g>
            <g
              //filter='url(#ueyyoz5sma)'
              transform="translate(-957 -24) translate(933) translate(24 24)">
              <path d="M0 0L24 0 24 24 0 24z" />
              <path
                className="icon-close--fill"
                fillRule="nonzero"
                d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

const IconWarning = ({ className }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`icon-warning ${className}`}>
      <path
        d="M6.9488 2.28163L1.7016 11.8216C1.60109 12.0043 1.54993 12.2101 1.55315 12.4186C1.55637 12.6271 1.61387 12.8311 1.71998 13.0106C1.82609 13.1902 1.97714 13.3389 2.15825 13.4423C2.33936 13.5456 2.54428 13.6 2.7528 13.6H13.248C13.4565 13.6 13.6614 13.5456 13.8426 13.4423C14.0237 13.3389 14.1747 13.1902 14.2808 13.0106C14.3869 12.8311 14.4444 12.6271 14.4477 12.4186C14.4509 12.2101 14.3997 12.0043 14.2992 11.8216L9.0512 2.28163C8.94761 2.09348 8.79543 1.93659 8.61052 1.82732C8.42562 1.71804 8.21478 1.6604 8 1.6604C7.78523 1.6604 7.57438 1.71804 7.38948 1.82732C7.20458 1.93659 7.05239 2.09348 6.9488 2.28163ZM8 5.40003C8.15913 5.40003 8.31175 5.46324 8.42427 5.57576C8.53679 5.68828 8.6 5.8409 8.6 6.00003V9.20003C8.6 9.35916 8.53679 9.51177 8.42427 9.62429C8.31175 9.73681 8.15913 9.80003 8 9.80003C7.84087 9.80003 7.68826 9.73681 7.57574 9.62429C7.46322 9.51177 7.4 9.35916 7.4 9.20003V6.00003C7.4 5.8409 7.46322 5.68828 7.57574 5.57576C7.68826 5.46324 7.84087 5.40003 8 5.40003ZM8.6 11C8.6 11.1592 8.53679 11.3118 8.42427 11.4243C8.31175 11.5368 8.15913 11.6 8 11.6C7.84087 11.6 7.68826 11.5368 7.57574 11.4243C7.46322 11.3118 7.4 11.1592 7.4 11C7.4 10.8409 7.46322 10.6883 7.57574 10.5758C7.68826 10.4632 7.84087 10.4 8 10.4C8.15913 10.4 8.31175 10.4632 8.42427 10.5758C8.53679 10.6883 8.6 10.8409 8.6 11Z"
        className="icon-fill"
      />
    </svg>
  );
};

const IconPhone = () => {
  return (
    <svg
      width="14"
      height="18"
      viewBox="0 0 14 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-phone">
      <path
        className="icon-fill"
        d="M6.78624 6.54882L5.44625 7.77882C5.61809 8.39938 5.86579 8.99638 6.18374 9.55632C6.51275 10.1094 6.90542 10.6221 7.35374 11.0838L9.08999 10.5376C9.56508 10.3881 10.074 10.3838 10.5515 10.5255C11.029 10.6671 11.4533 10.9482 11.77 11.3326L12.76 12.5351C13.5912 13.5451 13.4937 15.0276 12.5362 15.9201C10.9237 17.4226 8.44124 17.9326 6.58124 16.4388C4.94178 15.117 3.55959 13.5047 2.50375 11.6826C1.2325 9.49757 0.656246 7.40507 0.406246 5.76007C0.0487461 3.40382 1.7375 1.51757 3.84125 0.875073C4.44604 0.690051 5.09862 0.742595 5.66601 1.022C6.23341 1.3014 6.67292 1.78663 6.89499 2.37882L7.4375 3.82882C7.61241 4.29547 7.64387 4.80376 7.52783 5.28842C7.41179 5.77307 7.15354 6.21199 6.78624 6.54882Z"
      />
    </svg>
  );
};

const IconMail = () => {
  return (
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-mail">
      <path
        className="icon-fill"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.5 4.82722V10.75C0.5 11.413 0.763392 12.0489 1.23223 12.5178C1.70107 12.9866 2.33696 13.25 3 13.25H13C13.663 13.25 14.2989 12.9866 14.7678 12.5178C15.2366 12.0489 15.5 11.413 15.5 10.75V4.82722L8.69725 8.39866C8.26067 8.62786 7.73933 8.62787 7.30275 8.39866L0.5 4.82722ZM15.5 3.69778V3.25C15.5 2.58696 15.2366 1.95107 14.7678 1.48223C14.2989 1.01339 13.663 0.75 13 0.75H3C2.33696 0.75 1.70107 1.01339 1.23223 1.48223C0.763392 1.95107 0.5 2.58696 0.5 3.25V3.69778L7.76758 7.51326C7.91311 7.58966 8.08689 7.58966 8.23242 7.51326L15.5 3.69778Z"
      />
    </svg>
  );
};

const IconCompany = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-company">
      <path
        className="icon-fill"
        d="M3 0H13C13.0733 2.74801e-05 13.1457 0.0161652 13.212 0.0472705C13.2784 0.0783759 13.3371 0.123688 13.384 0.18L15.884 3.18C16.001 3.32 16 3.391 16 3.482V5C16 5.888 15.614 6.687 15 7.236V15.5C15 15.6326 14.9473 15.7598 14.8536 15.8536C14.7598 15.9473 14.6326 16 14.5 16H8V9.5C8 9.36739 7.94732 9.24021 7.85355 9.14645C7.75979 9.05268 7.63261 9 7.5 9H3.5C3.36739 9 3.24021 9.05268 3.14645 9.14645C3.05268 9.24021 3 9.36739 3 9.5V16H1.5C1.36739 16 1.24021 15.9473 1.14645 15.8536C1.05268 15.7598 1 15.6326 1 15.5V7.236C0.386 6.686 0 5.888 0 5V3.5C5.26234e-05 3.38305 0.0410991 3.26982 0.116 3.18L2.616 0.18C2.6629 0.123688 2.72161 0.0783759 2.78797 0.0472705C2.85433 0.0161652 2.92671 2.74801e-05 3 0ZM1 4V5C1 5.53043 1.21071 6.03914 1.58579 6.41421C1.96086 6.78929 2.46957 7 3 7C3.53043 7 4.03914 6.78929 4.41421 6.41421C4.78929 6.03914 5 5.53043 5 5V4H1ZM6 4V5C6 5.53043 6.21071 6.03914 6.58579 6.41421C6.96086 6.78929 7.46957 7 8 7C8.53043 7 9.03914 6.78929 9.41421 6.41421C9.78929 6.03914 10 5.53043 10 5V4H6ZM11 4V5C11 5.53043 11.2107 6.03914 11.5858 6.41421C11.9609 6.78929 12.4696 7 13 7C13.5304 7 14.0391 6.78929 14.4142 6.41421C14.7893 6.03914 15 5.53043 15 5V4H11ZM3.234 1L1.568 3H5.14L5.806 1H3.234ZM9.806 3L9.14 1H6.86L6.194 3H9.806ZM10.86 3H14.433L12.766 1H10.194L10.86 3ZM9 9.5V12.5C9 12.6326 9.05268 12.7598 9.14645 12.8536C9.24021 12.9473 9.36739 13 9.5 13H12.5C12.6326 13 12.7598 12.9473 12.8536 12.8536C12.9473 12.7598 13 12.6326 13 12.5V9.5C13 9.36739 12.9473 9.24021 12.8536 9.14645C12.7598 9.05268 12.6326 9 12.5 9H9.5C9.36739 9 9.24021 9.05268 9.14645 9.14645C9.05268 9.24021 9 9.36739 9 9.5Z"
      />
    </svg>
  );
};

const IconNotificationsLength = () => {
  return (
    <svg
      width="18"
      height="21"
      viewBox="0 0 18 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-notifications">
      <path
        className="icon-fill"
        d="M9.00002 0.9961C10.9466 0.993541 12.8178 1.74894 14.217 3.10226C15.6163 4.45557 16.4336 6.30048 16.496 8.2461L16.5 8.4961V12.5931L17.88 15.7491C17.9632 15.9393 17.9978 16.1473 17.9805 16.3542C17.9632 16.5611 17.8946 16.7604 17.781 16.9342C17.6674 17.108 17.5122 17.2507 17.3296 17.3495C17.147 17.4483 16.9426 17.5001 16.735 17.5001L12 17.5011C12.001 18.2821 11.6975 19.0327 11.1538 19.5934C10.6101 20.1541 9.86922 20.4807 9.08856 20.5037C8.30791 20.5268 7.54903 20.2445 6.97323 19.7168C6.39743 19.1892 6.05008 18.4578 6.00502 17.6781L6.00002 17.4991L1.27502 17.5001C1.06761 17.5002 0.86344 17.4487 0.680911 17.3502C0.498381 17.2517 0.343231 17.1093 0.229442 16.9359C0.115654 16.7625 0.0468043 16.5635 0.0290991 16.3568C0.0113938 16.1502 0.0453894 15.9423 0.128022 15.7521L1.50002 12.5941V8.4961C1.50002 4.3411 4.85202 0.9961 9.00002 0.9961ZM10.5 17.5001L7.50002 17.5021C7.49996 17.8874 7.64816 18.258 7.91391 18.5369C8.17967 18.8159 8.54259 18.982 8.92744 19.0006C9.31229 19.0192 9.68956 18.8891 9.98103 18.6371C10.2725 18.3851 10.4558 18.0306 10.493 17.6471L10.5 17.5001Z"
      />
    </svg>
  );
};
const IconNotificationsEmpty = () => {
  return (
    <svg
      width="18"
      height="21"
      viewBox="0 0 18 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-notifications">
      <path
        className="icon-empty"
        d="M9.00002 0.9961C10.9466 0.993541 12.8178 1.74894 14.217 3.10226C15.6163 4.45557 16.4336 6.30048 16.496 8.2461L16.5 8.4961V12.5931L17.88 15.7491C17.9632 15.9393 17.9978 16.1473 17.9805 16.3542C17.9632 16.5611 17.8946 16.7604 17.781 16.9342C17.6674 17.108 17.5122 17.2507 17.3296 17.3495C17.147 17.4483 16.9426 17.5001 16.735 17.5001L12 17.5011C12.001 18.2821 11.6975 19.0327 11.1538 19.5934C10.6101 20.1541 9.86922 20.4807 9.08856 20.5037C8.30791 20.5268 7.54903 20.2445 6.97323 19.7168C6.39743 19.1892 6.05008 18.4578 6.00502 17.6781L6.00002 17.4991L1.27502 17.5001C1.06761 17.5002 0.86344 17.4487 0.680911 17.3502C0.498381 17.2517 0.343231 17.1093 0.229442 16.9359C0.115654 16.7625 0.0468043 16.5635 0.0290991 16.3568C0.0113938 16.1502 0.0453894 15.9423 0.128022 15.7521L1.50002 12.5941V8.4961C1.50002 4.3411 4.85202 0.9961 9.00002 0.9961ZM10.5 17.5001L7.50002 17.5021C7.49996 17.8874 7.64816 18.258 7.91391 18.5369C8.17967 18.8159 8.54259 18.982 8.92744 19.0006C9.31229 19.0192 9.68956 18.8891 9.98103 18.6371C10.2725 18.3851 10.4558 18.0306 10.493 17.6471L10.5 17.5001Z"
      />
    </svg>
  );
};

const IconDeleteFile = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-delete-file">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3H16.5C16.6989 3 16.8897 3.07902 17.0303 3.21967C17.171 3.36032 17.25 3.55109 17.25 3.75C17.25 3.94891 17.171 4.13968 17.0303 4.28033C16.8897 4.42098 16.6989 4.5 16.5 4.5H15.6705L14.5425 14.664C14.4406 15.5813 14.004 16.4288 13.3163 17.0443C12.6285 17.6598 11.738 18.0001 10.815 18H7.185C6.26205 18.0001 5.37148 17.6598 4.68373 17.0443C3.99599 16.4288 3.55939 15.5813 3.4575 14.664L2.328 4.5H1.5C1.30109 4.5 1.11032 4.42098 0.96967 4.28033C0.829018 4.13968 0.75 3.94891 0.75 3.75C0.75 3.55109 0.829018 3.36032 0.96967 3.21967C1.11032 3.07902 1.30109 3 1.5 3H6C6 2.20435 6.31607 1.44129 6.87868 0.87868C7.44129 0.31607 8.20435 0 9 0C9.79565 0 10.5587 0.31607 11.1213 0.87868C11.6839 1.44129 12 2.20435 12 3ZM9 1.5C8.60218 1.5 8.22064 1.65804 7.93934 1.93934C7.65804 2.22064 7.5 2.60218 7.5 3H10.5C10.5 2.60218 10.342 2.22064 10.0607 1.93934C9.77936 1.65804 9.39782 1.5 9 1.5ZM6.75 7.5V13.5C6.75 13.6989 6.82902 13.8897 6.96967 14.0303C7.11032 14.171 7.30109 14.25 7.5 14.25C7.69891 14.25 7.88968 14.171 8.03033 14.0303C8.17098 13.8897 8.25 13.6989 8.25 13.5V7.5C8.25 7.30109 8.17098 7.11032 8.03033 6.96967C7.88968 6.82902 7.69891 6.75 7.5 6.75C7.30109 6.75 7.11032 6.82902 6.96967 6.96967C6.82902 7.11032 6.75 7.30109 6.75 7.5ZM11.0303 6.96967C10.8897 6.82902 10.6989 6.75 10.5 6.75C10.3011 6.75 10.1103 6.82902 9.96967 6.96967C9.82902 7.11032 9.75 7.30109 9.75 7.5V13.5C9.75 13.6989 9.82902 13.8897 9.96967 14.0303C10.1103 14.171 10.3011 14.25 10.5 14.25C10.6989 14.25 10.8897 14.171 11.0303 14.0303C11.171 13.8897 11.25 13.6989 11.25 13.5V7.5C11.25 7.30109 11.171 7.11032 11.0303 6.96967Z"
        className="icon-fill"
      />
    </svg>
  );
};

const IconComment = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-comment">
      <path
        d="M2.33333 1H13C13.7333 1 14.3333 1.6 14.3333 2.33333V10.6695C14.3333 11.4028 13.7333 12.0028 13 12.0028H4.08088C3.81566 12.0028 3.56131 12.1082 3.37377 12.2957L1.68284 13.9866C1.43086 14.2386 1 14.0602 1 13.7038V2.33333C1 1.6 1.6 1 2.33333 1Z"
        className="icon-fill"
      />
    </svg>
  );
};

const IconReply = () => {
  return (
    <svg
      width="21"
      height="15"
      viewBox="0 0 21 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-reply">
      <path
        d="M12.9742 0.777496C13.1645 0.968167 13.2801 1.2208 13.2999 1.48945C13.3197 1.75811 13.2425 2.02496 13.0822 2.2415L12.9742 2.3675L9.59024 5.75H11.3752C16.8517 5.75 20.5732 8.8655 20.7442 13.3055L20.7502 13.625C20.7502 13.9234 20.6317 14.2095 20.4207 14.4205C20.2098 14.6315 19.9236 14.75 19.6252 14.75C19.3269 14.75 19.0407 14.6315 18.8297 14.4205C18.6188 14.2095 18.5002 13.9234 18.5002 13.625C18.5002 10.433 15.9622 8.138 11.7607 8.006L11.3752 8H9.59024L12.9742 11.384C13.1755 11.5847 13.2934 11.8542 13.304 12.1383C13.3147 12.4224 13.2175 12.7 13.0318 12.9153C12.8462 13.1305 12.5859 13.2676 12.3033 13.2988C12.0208 13.33 11.7369 13.2531 11.5087 13.0835L11.3827 12.974L6.07874 7.6715L5.97674 7.5515L5.91674 7.4645L5.84174 7.322L5.79224 7.184L5.76974 7.0835L5.75474 6.9905L5.75024 6.8495L5.75624 6.761L5.77874 6.62L5.82374 6.47L5.89424 6.323L5.94674 6.2405L5.98574 6.1865L6.07874 6.08L11.3827 0.777496C11.5937 0.566821 11.8796 0.448486 12.1777 0.448486C12.4759 0.448486 12.7618 0.566821 12.9727 0.777496H12.9742ZM0.830237 6.08L6.08024 0.829997C6.28097 0.628707 6.55047 0.510876 6.83455 0.500194C7.11862 0.489511 7.39621 0.58677 7.6115 0.772415C7.82679 0.958061 7.96381 1.21833 7.99502 1.50088C8.02623 1.78344 7.94932 2.06734 7.77974 2.2955L7.67024 2.4215L3.21524 6.8765L7.67024 11.33C7.86967 11.531 7.98598 11.7998 7.99594 12.0828C8.00591 12.3658 7.9088 12.6421 7.724 12.8566C7.53919 13.0712 7.28029 13.2081 6.99896 13.2402C6.71762 13.2722 6.43455 13.197 6.20624 13.0295L6.08024 12.9215L0.830237 7.6715C0.639317 7.48093 0.523228 7.2281 0.503129 6.9591C0.483029 6.69009 0.560257 6.42282 0.720736 6.206L0.830237 6.08L6.08024 0.829997L0.830237 6.08V6.08Z"
        className="icon-fill"
      />
    </svg>
  );
};

const IconEditPencil = () => {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-edit-pencil">
      <path
        d="M10.2415 5.58589L4.26946 11.5589C3.94911 11.879 3.54783 12.1061 3.10846 12.2159L0.817463 12.7889C0.733587 12.81 0.645663 12.809 0.562284 12.786C0.478905 12.763 0.402922 12.7188 0.341759 12.6576C0.280597 12.5964 0.236347 12.5204 0.213334 12.4371C0.190321 12.3537 0.189332 12.2658 0.210463 12.1819L0.783463 9.89189C0.893379 9.45206 1.12083 9.05039 1.44146 8.72989L7.41246 2.75689L10.2415 5.58589ZM11.6565 1.34389C12.0314 1.71894 12.242 2.22756 12.242 2.75789C12.242 3.28821 12.0314 3.79683 11.6565 4.17189L10.9485 4.87789L8.11946 2.04989L8.82746 1.34389C9.01319 1.15808 9.2337 1.01069 9.47641 0.910131C9.71911 0.809571 9.97925 0.757812 10.242 0.757812C10.5047 0.757812 10.7648 0.809571 11.0075 0.910131C11.2502 1.01069 11.4707 1.15808 11.6565 1.34389Z"
        className="icon-fill"
      />
    </svg>
  );
};

const IconAdd = () => {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-add">
      <path
        d="M0 6C-1.17411e-08 5.21207 0.155195 4.43185 0.456723 3.7039C0.758251 2.97595 1.20021 2.31451 1.75736 1.75736C2.31451 1.20021 2.97595 0.758251 3.7039 0.456723C4.43185 0.155195 5.21207 0 6 0C6.78793 0 7.56815 0.155195 8.2961 0.456723C9.02405 0.758251 9.68549 1.20021 10.2426 1.75736C10.7998 2.31451 11.2417 2.97595 11.5433 3.7039C11.8448 4.43185 12 5.21207 12 6C12 7.5913 11.3679 9.11742 10.2426 10.2426C9.11742 11.3679 7.5913 12 6 12C4.4087 12 2.88258 11.3679 1.75736 10.2426C0.632141 9.11742 2.37122e-08 7.5913 0 6ZM6 3C5.86739 3 5.74021 3.05268 5.64645 3.14645C5.55268 3.24021 5.5 3.36739 5.5 3.5V5.5H3.5C3.36739 5.5 3.24021 5.55268 3.14645 5.64645C3.05268 5.74021 3 5.86739 3 6C3 6.13261 3.05268 6.25979 3.14645 6.35355C3.24021 6.44732 3.36739 6.5 3.5 6.5H5.5V8.5C5.5 8.63261 5.55268 8.75979 5.64645 8.85355C5.74021 8.94732 5.86739 9 6 9C6.13261 9 6.25979 8.94732 6.35355 8.85355C6.44732 8.75979 6.5 8.63261 6.5 8.5V6.5H8.5C8.63261 6.5 8.75979 6.44732 8.85355 6.35355C8.94732 6.25979 9 6.13261 9 6C9 5.86739 8.94732 5.74021 8.85355 5.64645C8.75979 5.55268 8.63261 5.5 8.5 5.5H6.5V3.5C6.5 3.36739 6.44732 3.24021 6.35355 3.14645C6.25979 3.05268 6.13261 3 6 3Z"
        className="icon-fill"
      />
    </svg>
  );
};

const IconDownload = () => {
  return (
    <svg
      width="12"
      height="14"
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-download">
      <path
        d="M1.49977 12H10.4998C10.6898 12.0001 10.8727 12.0722 11.0116 12.202C11.1504 12.3317 11.2348 12.5093 11.2478 12.6989C11.2607 12.8885 11.2013 13.0759 11.0813 13.2233C10.9614 13.3707 10.79 13.4671 10.6018 13.493L10.4998 13.5H1.49977C1.30975 13.4999 1.12683 13.4278 0.98798 13.298C0.849129 13.1683 0.764697 12.9907 0.751745 12.8011C0.738793 12.6115 0.798287 12.4241 0.918204 12.2767C1.03812 12.1293 1.20952 12.0329 1.39777 12.007L1.49977 12H10.4998H1.49977ZM5.89777 0.00699997L5.99977 0C6.18101 7.6429e-06 6.35611 0.0656428 6.4927 0.184767C6.62929 0.303892 6.71812 0.468446 6.74277 0.648L6.74977 0.75V8.438L9.00477 6.184C9.13194 6.05687 9.30056 5.97966 9.47989 5.96645C9.65922 5.95323 9.83734 6.00489 9.98177 6.112L10.0658 6.184C10.1929 6.31117 10.2701 6.47979 10.2833 6.65912C10.2965 6.83845 10.2449 7.01657 10.1378 7.161L10.0658 7.245L6.52977 10.78C6.40278 10.907 6.23443 10.9842 6.05532 10.9976C5.87621 11.011 5.69824 10.9597 5.55377 10.853L5.46977 10.78L1.93377 7.245C1.79958 7.11118 1.72102 6.93151 1.7139 6.74213C1.70678 6.55274 1.77162 6.36768 1.89538 6.22416C2.01915 6.08063 2.19266 5.98928 2.38103 5.96848C2.5694 5.94767 2.75867 5.99895 2.91077 6.112L2.99477 6.184L5.24977 8.44V0.75C5.24978 0.568762 5.31541 0.393658 5.43454 0.257069C5.55366 0.120481 5.71822 0.0316483 5.89777 0.00699997L5.99977 0L5.89777 0.00699997Z"
        className="icon-fill"
      />
    </svg>
  );
};

const IconFilter = () => {
  return (
    <svg
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-filter">
      <path
        d="M4.49983 8.00061H7.50027C7.69145 8.00082 7.87535 8.07403 8.01437 8.20528C8.15339 8.33652 8.23705 8.5159 8.24826 8.70676C8.25946 8.89762 8.19736 9.08555 8.07465 9.23216C7.95194 9.37878 7.77788 9.473 7.58803 9.49558L7.50027 9.50083H4.49983C4.30864 9.50062 4.12475 9.42741 3.98573 9.29616C3.8467 9.16492 3.76304 8.98554 3.75184 8.79468C3.74063 8.60382 3.80273 8.41589 3.92544 8.26928C4.04815 8.12266 4.22222 8.02844 4.41207 8.00586L4.49983 8.00061H7.50027H4.49983ZM2.99961 4.25006H9.00049C9.19167 4.25027 9.37556 4.32348 9.51459 4.45473C9.65361 4.58597 9.73727 4.76535 9.74847 4.95621C9.75968 5.14707 9.69758 5.335 9.57487 5.48162C9.45216 5.62823 9.2781 5.72245 9.08825 5.74503L9.00049 5.75028H2.99961C2.80842 5.75007 2.62453 5.67686 2.48551 5.54561C2.34648 5.41437 2.26282 5.23499 2.25162 5.04413C2.24042 4.85327 2.30251 4.66534 2.42522 4.51873C2.54793 4.37211 2.722 4.27789 2.91184 4.25531L2.99961 4.25006H9.00049H2.99961ZM0.749279 0.499512H11.2508C11.442 0.499724 11.6259 0.572932 11.7649 0.704178C11.9039 0.835424 11.9876 1.0148 11.9988 1.20566C12.01 1.39652 11.9479 1.58446 11.8252 1.73107C11.7025 1.87768 11.5284 1.9719 11.3386 1.99448L11.2508 1.99973H0.749279C0.558091 1.99952 0.374199 1.92631 0.235177 1.79507C0.0961545 1.66382 0.0124947 1.48444 0.00129022 1.29358C-0.00991426 1.10272 0.0521825 0.914788 0.174893 0.768177C0.297604 0.621565 0.471666 0.527344 0.661516 0.504762L0.749279 0.499512H11.2508H0.749279Z"
        className="icon-fill"
      />
    </svg>
  );
};

const CloseIconModal = () => {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.396914 0.553943L0.469914 0.469943C0.596902 0.342925 0.765256 0.265697 0.944365 0.252301C1.12347 0.238904 1.30144 0.290229 1.44591 0.396943L1.52991 0.469943L5.99991 4.93894L10.4699 0.468943C10.5391 0.397344 10.6219 0.340247 10.7134 0.300984C10.805 0.261721 10.9034 0.241078 11.003 0.24026C11.1026 0.239442 11.2013 0.258465 11.2935 0.296219C11.3856 0.333973 11.4693 0.389702 11.5397 0.460154C11.6101 0.530607 11.6657 0.614372 11.7034 0.706561C11.7411 0.798751 11.76 0.897519 11.7591 0.997103C11.7582 1.09669 11.7375 1.19509 11.6981 1.28658C11.6588 1.37806 11.6016 1.46079 11.5299 1.52994L7.06091 5.99994L11.5309 10.4699C11.6578 10.5971 11.7348 10.7655 11.748 10.9446C11.7613 11.1237 11.7098 11.3016 11.6029 11.4459L11.5299 11.5299C11.4029 11.657 11.2346 11.7342 11.0555 11.7476C10.8764 11.761 10.6984 11.7097 10.5539 11.6029L10.4699 11.5299L5.99991 7.06094L1.52991 11.5309C1.3884 11.6675 1.19891 11.743 1.00226 11.7412C0.805615 11.7394 0.617542 11.6604 0.47855 11.5213C0.339559 11.3822 0.260771 11.194 0.259156 10.9974C0.25754 10.8007 0.333227 10.6113 0.469914 10.4699L4.93891 5.99994L0.468914 1.52994C0.342046 1.40283 0.265002 1.23441 0.251789 1.0553C0.238577 0.876199 0.290072 0.698298 0.396914 0.553943L0.469914 0.469943L0.396914 0.553943Z"
        fill="#3C4252"
      />
    </svg>
  );
};
const UpVector = () => {
  return (
    <svg
      width="8"
      height="6"
      viewBox="0 0 8 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginBottom: '5px', marginLeft: '5px' }}>
      <path
        d="M1.07612 4.38279C1.15186 4.56547 1.28007 4.7216 1.44454 4.83142C1.60901 4.94124 1.80235 4.99984 2.00012 4.99979H6.00012C6.19787 4.99974 6.39116 4.94107 6.55557 4.83119C6.71998 4.7213 6.84812 4.56514 6.92379 4.38244C6.99946 4.19974 7.01927 3.99871 6.9807 3.80475C6.94213 3.6108 6.84693 3.43264 6.70712 3.29279L4.70712 1.29279C4.51959 1.10532 4.26528 1 4.00012 1C3.73495 1 3.48064 1.10532 3.29312 1.29279L1.29312 3.29279C1.15318 3.43263 1.05787 3.61084 1.01925 3.80486C0.98062 3.99889 1.00041 4.20001 1.07612 4.38279Z"
        fill="#10AC84"
      />
      <path
        d="M0.614174 4.57412L0.614242 4.57429C0.727858 4.84832 0.920176 5.0825 1.16688 5.24724C1.41355 5.41195 1.70351 5.49984 2.00012 5.49979C2.00016 5.49979 2.0002 5.49979 2.00024 5.49979H6.00012H6.00022C6.29685 5.49972 6.58679 5.41172 6.83341 5.24689C7.08002 5.08206 7.27223 4.84782 7.38574 4.57377C7.49925 4.29972 7.52895 3.99817 7.4711 3.70724C7.41325 3.41631 7.27044 3.14906 7.06072 2.93929L7.06067 2.93923L5.06067 0.939233L5.06062 0.93918C4.77932 0.657973 4.39786 0.5 4.00012 0.5C3.60237 0.5 3.22091 0.657973 2.93962 0.93918L2.93956 0.939233L0.939673 2.93912C0.939636 2.93916 0.939599 2.9392 0.939563 2.93923C0.729724 3.14898 0.586801 3.41625 0.52887 3.70724C0.47093 3.99828 0.500616 4.29996 0.614174 4.57412Z"
        stroke="white"
        strokeOpacity="0.5"
      />
    </svg>
  );
};

const LogOut = () => {
  return (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 10V8H5V5L0 9L5 13V10H14Z" fill="#305FF5" />
      <path
        d="M18 0H9C7.897 0 7 0.897 7 2V6H9V2H18V16H9V12H7V16C7 17.103 7.897 18 9 18H18C19.103 18 20 17.103 20 16V2C20 0.897 19.103 0 18 0Z"
        fill="#305FF5"
      />
    </svg>
  );
};

const DeleteCompanySVG = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 4H13C13.1326 4 13.2598 4.05268 13.3536 4.14645C13.4473 4.24021 13.5 4.36739 13.5 4.5C13.5 4.63261 13.4473 4.75979 13.3536 4.85355C13.2598 4.94732 13.1326 5 13 5H12.447L11.695 11.776C11.6271 12.3875 11.336 12.9525 10.8775 13.3629C10.419 13.7732 9.8253 14.0001 9.21 14H6.79C6.1747 14.0001 5.58098 13.7732 5.12249 13.3629C4.664 12.9525 4.37293 12.3875 4.305 11.776L3.552 5H3C2.86739 5 2.74021 4.94732 2.64645 4.85355C2.55268 4.75979 2.5 4.63261 2.5 4.5C2.5 4.36739 2.55268 4.24021 2.64645 4.14645C2.74021 4.05268 2.86739 4 3 4H6C6 3.46957 6.21071 2.96086 6.58579 2.58579C6.96086 2.21071 7.46957 2 8 2C8.53043 2 9.03914 2.21071 9.41421 2.58579C9.78929 2.96086 10 3.46957 10 4ZM8 3C7.73478 3 7.48043 3.10536 7.29289 3.29289C7.10536 3.48043 7 3.73478 7 4H9C9 3.73478 8.89464 3.48043 8.70711 3.29289C8.51957 3.10536 8.26522 3 8 3ZM6.5 7V11C6.5 11.1326 6.55268 11.2598 6.64645 11.3536C6.74021 11.4473 6.86739 11.5 7 11.5C7.13261 11.5 7.25979 11.4473 7.35355 11.3536C7.44732 11.2598 7.5 11.1326 7.5 11V7C7.5 6.86739 7.44732 6.74021 7.35355 6.64645C7.25979 6.55268 7.13261 6.5 7 6.5C6.86739 6.5 6.74021 6.55268 6.64645 6.64645C6.55268 6.74021 6.5 6.86739 6.5 7ZM9.35355 6.64645C9.25979 6.55268 9.13261 6.5 9 6.5C8.86739 6.5 8.74021 6.55268 8.64645 6.64645C8.55268 6.74021 8.5 6.86739 8.5 7V11C8.5 11.1326 8.55268 11.2598 8.64645 11.3536C8.74021 11.4473 8.86739 11.5 9 11.5C9.13261 11.5 9.25979 11.4473 9.35355 11.3536C9.44732 11.2598 9.5 11.1326 9.5 11V7C9.5 6.86739 9.44732 6.74021 9.35355 6.64645Z"
        fill="#3C4252"
      />
    </svg>
  );
};

export {
  IconInfo,
  IconClose,
  IconWarning,
  IconPhone,
  IconMail,
  IconCompany,
  IconNotificationsLength,
  IconNotificationsEmpty,
  IconDeleteFile,
  IconComment,
  IconReply,
  IconEditPencil,
  IconAdd,
  IconDownload,
  IconFilter,
  CloseIconModal,
  UpVector,
  LogOut,
  DeleteCompanySVG,
};
