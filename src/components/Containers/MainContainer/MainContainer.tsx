import styles from './MainContainer.module.css' 

export const MainContainer = (props: { children: React.ReactNode }) => {
	return (
		<div className={styles.main}>
			{props.children}
		</div>
	)
}

export default MainContainer
