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
import { Spacer } from 'src/ui/spacer/spacer';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	onApply: (settings: typeof defaultArticleState) => void;
}

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
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
				setIsMenuOpen(false);
			}
		};

		if (isMenuOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	const handleReset = () => {
		setSelectedFontFamilyOption(defaultArticleState.fontFamilyOption);
		setSelectedFontSizeOption(defaultArticleState.fontSizeOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);

		// Применяем сброшенные настройки
		onApply(defaultArticleState);
	};

	const handleApply = () => {
		const currentSettings = {
			fontFamilyOption: selectedFontFamilyOption,
			fontSizeOption: selectedFontSizeOption,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContentWidth,
		};

		onApply(currentSettings);
	};

	return (
		<>
			<ArrowButton
				isMenuOpen={isMenuOpen}
				onClick={(e) => {
					e.stopPropagation();
					setIsMenuOpen(!isMenuOpen);
				}}
			/>
			<aside
				ref={asideRef}
				className={`${styles.container} ${
					isMenuOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<Spacer />
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={selectedFontFamilyOption}
						onChange={setSelectedFontFamilyOption}
						placeholder='Выберите опцию'
					/>
					<Spacer />
					<RadioGroup
						title='Размер шрифта'
						name='radio-group'
						options={fontSizeOptions}
						selected={selectedFontSizeOption}
						onChange={setSelectedFontSizeOption}
					/>
					<Spacer />
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={selectedFontColor}
						onChange={setSelectedFontColor}
						placeholder='Выберите опцию'
					/>
					<Spacer />
					<Separator />
					<Spacer />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={selectedBackgroundColor}
						onChange={setSelectedBackgroundColor}
						placeholder='Выберите опцию'
					/>
					<Spacer />
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={selectedContentWidth}
						onChange={setSelectedContentWidth}
						placeholder='Выберите опцию'
					/>
					<Spacer width={554} height={207} />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' onClick={handleReset} />
						<Button title='Применить' type='apply' onClick={handleApply} />
					</div>
				</form>
			</aside>
		</>
	);
};
