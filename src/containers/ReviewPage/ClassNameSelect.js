import styles from "./Review.module.scss";

function ClassNameSelect(num){
    if(num === 1) return styles.content1
    else if(num === 2) return styles.content2
    else if(num === 3) return styles.content3
    else if(num === 4) return styles.content4
    else if(num === 5) return styles.content5
    else if(num === 6) return styles.content6
    else if(num === 7) return styles.content7
    else if(num === 8) return styles.content8
    else if(num === 9) return styles.content9
    else if(num === 10) return styles.content10
    else return styles.content11
}

export default ClassNameSelect;