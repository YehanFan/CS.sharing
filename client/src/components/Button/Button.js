import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";
import cx from "classnames";

import Icon from "../Icon/Icon";

function Button({ variant, description, leadingIcon, trailingIcon, children, className, onClick, ...rest }) {

    function handleClick(e) {
        if (onClick) {
          e.preventDefault();
          onClick();
        } else {
          return null;
        }
      }

      const propClass = {
        [styles.hasLeadingIcon]: leadingIcon,
        [styles.hasTrailingIcon] : trailingIcon
      }

    return (
        <button 
        className={cx(styles[variant], propClass, className)} 
        onClick={handleClick} 
        {...rest}>
          {leadingIcon && <Icon icon={leadingIcon} />}
          {description && <span className="sr-only">{description}</span>}
          {children && <span>{children}</span>}
          {trailingIcon && <Icon icon={trailingIcon} />}
        </button>
      );
}

Button.propTypes = {
  description: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  variant: PropTypes.string.isRequired,
};

Button.defaultProps = {
  variant: "primary",
};

export default Button;
