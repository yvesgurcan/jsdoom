import getElementById from './getElementById';

export default id => {
    const element = getElementById(id);
    return element.parentNode.removeChild(element);
};
