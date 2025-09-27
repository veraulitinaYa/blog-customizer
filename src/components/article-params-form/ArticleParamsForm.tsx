import { useEffect, useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	fontColors,
	fontFamilyOptions,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const asideRef = useRef<HTMLElement>(null);

	const [selectedFontFamilyOption, setSelectedFontFamilyOption] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontSizeOption, setSelectedFontSizeOption] = useState(
		defaultArticleState.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState(
		defaultArticleState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	// Закрытие по клику вне сайдбара
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				asideRef.current &&
				!asideRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			{/* повторный клик по стрелке инвертирует isOpen */}
			<ArrowButton
				isOpen={isOpen}
				onClick={(e) => {
					e.stopPropagation();
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				ref={asideRef}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form}>
					{/* 1. Select */}
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={selectedFontFamilyOption}
						onChange={setSelectedFontFamilyOption}
						placeholder='Выберите опцию'
					/>

					{/* 2. Radio group */}
					<RadioGroup
						title='Группа радио'
						name='radio-group'
						options={fontSizeOptions}
						selected={selectedFontSizeOption}
						onChange={setSelectedFontSizeOption}
					/>

					{/* 3. Select */}
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={selectedFontColor}
						onChange={setSelectedFontColor}
						placeholder='Выберите опцию'
					/>

					{/* 4. Separator */}
					<Separator />

					{/* 5. Select */}
					<Select
						title='Третий селект'
						options={backgroundColors}
						selected={selectedBackgroundColor}
						onChange={setSelectedBackgroundColor}
						placeholder='Выберите опцию'
					/>

					{/* 6. Select */}
					<Select
						title='Четвертый селект'
						options={contentWidthArr}
						selected={selectedContentWidth}
						onChange={setSelectedContentWidth}
						placeholder='Выберите опцию'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
