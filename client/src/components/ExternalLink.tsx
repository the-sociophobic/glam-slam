import React from 'react'


export type ExternalLinkProps = {
  to: string
  newTab?: boolean
  className?: string
  children?: JSX.Element | string
  disabled?: boolean
}


const ExternalLink: React.FC<ExternalLinkProps> = ({
  to,
  newTab,
  className,
  children,
  disabled,
}) =>
  disabled ?
    <div className={`${className} cursor-default`}>
      {children}
    </div>
    :
    <a
      className={className}
      href={(to.includes('http') ? '' : 'https://') + to}
      target={newTab ? "_blank" : ""}
      rel="noopener noreferrer"
    >
      {children}
    </a>


export default ExternalLink