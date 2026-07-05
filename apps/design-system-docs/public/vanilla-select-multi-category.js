/**
 * SelectMultiCategory - Vanilla JavaScript Component
 * A multi-select dropdown component with categorized items and search functionality
 *
 * @example
 * const select = new SelectMultiCategory(containerElement, {
 *   categories: [
 *     {
 *       name: 'Fruits',
 *       items: [
 *         { value: 'apple', label: 'Apple', description: 'A red fruit' },
 *         { value: 'banana', label: 'Banana' }
 *       ]
 *     }
 *   ],
 *   placeholder: 'Select items...',
 *   onChange: (values) => console.log('Selected:', values)
 * });
 */

class SelectMultiCategory {
	constructor(container, options = {}) {
		this.container = container;
		this.options = {
			categories: options.categories || [],
			value: options.value || [],
			onChange: options.onChange || (() => {}),
			placeholder: options.placeholder || 'Select items...',
			searchPlaceholder: options.searchPlaceholder || 'Search...',
			disabled: options.disabled || false,
			isLoading: options.isLoading || false,
		};

		this.state = {
			isOpen: false,
			selectedValues: [...this.options.value],
			activeCategory: null,
			searchQueries: {},
		};

		this.elements = {};
		this.init();
	}

	init() {
		// Bind event handlers once
		this.boundHandleClickOutside = this.handleClickOutside.bind(this);
		this.boundHandleKeyDown = this.handleKeyDown.bind(this);
		this.boundHandleClick = this.handleClick.bind(this);
		this.boundHandleInput = this.handleInput.bind(this);

		this.render();
		this.attachEventListeners();
	}

	render() {
		this.container.innerHTML = `
			<div class="select-multi-category" data-component="select-multi-category">
				${this.renderTrigger()}
				${this.renderDropdown()}
			</div>
		`;

		this.cacheElements();
	}

	cacheElements() {
		this.elements = {
			trigger: this.container.querySelector('[data-trigger]'),
			dropdown: this.container.querySelector('[data-dropdown]'),
			clearBtn: this.container.querySelector('[data-clear]'),
			displayText: this.container.querySelector('[data-display-text]'),
			expandIcon: this.container.querySelector('[data-expand-icon]'),
		};
	}

	renderTrigger() {
		const displayText = this.formatSelectedValues() || this.options.placeholder;
		const hasSelection = this.state.selectedValues.length > 0;
		const isOpen = this.state.isOpen;

		return `
			<div 
				class="select-trigger ${isOpen ? 'open' : ''} ${this.options.disabled ? 'disabled' : ''}" 
				data-trigger
				role="combobox"
				aria-expanded="${isOpen}"
				aria-haspopup="listbox"
				tabindex="${this.options.disabled ? '-1' : '0'}"
			>
				<span 
					class="select-display ${hasSelection ? '' : 'placeholder'}" 
					data-display-text
				>
					${displayText}
				</span>
				<div class="select-actions">
					${
						hasSelection && !this.options.disabled
							? `
						<button 
							type="button" 
							class="clear-btn" 
							data-clear
							aria-label="Clear selections"
							tabindex="-1"
						>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
								<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
							</svg>
						</button>
					`
							: ''
					}
					<svg 
						class="expand-icon ${isOpen ? 'rotated' : ''}" 
						data-expand-icon
						width="20" 
						height="20" 
						viewBox="0 0 24 24" 
						fill="currentColor"
					>
						<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
					</svg>
				</div>
				<span class="sr-only">${this.state.selectedValues.length} items selected</span>
			</div>
		`;
	}

	renderDropdown() {
		if (!this.state.isOpen) {
			return '<div class="select-dropdown" data-dropdown style="display: none;"></div>';
		}

		return `
			<div class="select-dropdown" data-dropdown>
				${this.options.categories.map(category => this.renderCategory(category)).join('')}
			</div>
		`;
	}

	renderCategory(category) {
		const isActive = this.state.activeCategory === category.name;
		const selectedCount = this.countSelectedInCategory(category.name);

		return `
			<div class="category-section" data-category="${category.name}">
				<div 
					class="category-header ${isActive ? 'active' : ''}" 
					data-category-header="${category.name}"
					role="button"
					tabindex="0"
				>
					<div class="category-header-content">
						<svg class="category-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
							${
								isActive
									? '<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>'
									: '<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>'
							}
						</svg>
						<span class="category-name">${category.name}</span>
					</div>
					${
						selectedCount > 0
							? `
						<span class="category-badge">${selectedCount} selected</span>
					`
							: ''
					}
				</div>
				${isActive ? this.renderCategoryItems(category) : ''}
			</div>
		`;
	}

	renderCategoryItems(category) {
		const searchQuery = this.state.searchQueries[category.name] || '';
		const filteredItems = this.getFilteredItems(category);

		return `
			<div class="category-items">
				<div class="category-search">
					<div class="search-input-wrapper">
						<svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
							<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
						</svg>
						<input
							type="text"
							class="category-search-input"
							placeholder="${this.options.searchPlaceholder}"
							value="${searchQuery}"
							data-search="${category.name}"
						/>
					</div>
				</div>
				<div class="items-list">
					${
						filteredItems.length > 0
							? filteredItems.map(item => this.renderItem(category.name, item)).join('')
							: '<div class="no-items">No items found</div>'
					}
				</div>
			</div>
		`;
	}

	renderItem(categoryName, item) {
		const fullValue = `${categoryName}:${item.value}`;
		const isSelected = this.state.selectedValues.includes(fullValue);

		return `
			<div 
				class="item ${isSelected ? 'selected' : ''}" 
				data-item="${fullValue}"
				role="checkbox"
				aria-checked="${isSelected}"
				tabindex="0"
			>
				<div class="item-checkbox ${isSelected ? 'checked' : ''}">
					${
						isSelected
							? `
						<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
							<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
						</svg>
					`
							: ''
					}
				</div>
				<div class="item-content">
					<div class="item-label">${item.label}</div>
					${
						item.description
							? `
						<div class="item-description">${item.description}</div>
					`
							: ''
					}
				</div>
			</div>
		`;
	}

	attachEventListeners() {
		// Remove old listeners first to prevent duplicates
		this.removeEventListeners();

		// Click outside to close
		document.addEventListener('click', this.boundHandleClickOutside);

		// Use event delegation for all clicks
		this.container.addEventListener('click', this.boundHandleClick);

		// Use event delegation for input events
		this.container.addEventListener('input', this.boundHandleInput);

		// Keyboard navigation
		this.container.addEventListener('keydown', this.boundHandleKeyDown);
	}

	removeEventListeners() {
		document.removeEventListener('click', this.boundHandleClickOutside);
		this.container.removeEventListener('click', this.boundHandleClick);
		this.container.removeEventListener('input', this.boundHandleInput);
		this.container.removeEventListener('keydown', this.boundHandleKeyDown);
	}

	handleClick(e) {
		// Prevent search input clicks from closing dropdown
		const searchInput = e.target.closest('[data-search]');
		if (searchInput) {
			e.stopPropagation();
			return;
		}

		// Trigger click
		const trigger = e.target.closest('[data-trigger]');
		if (trigger && !this.options.disabled) {
			e.stopPropagation();
			this.toggleDropdown();
			return;
		}

		// Clear button
		const clearBtn = e.target.closest('[data-clear]');
		if (clearBtn) {
			e.stopPropagation();
			this.clearAll();
			return;
		}

		// Category header clicks
		const categoryHeader = e.target.closest('[data-category-header]');
		if (categoryHeader) {
			e.stopPropagation();
			const categoryName = categoryHeader.dataset.categoryHeader;
			this.toggleCategory(categoryName);
			return;
		}

		// Item clicks
		const item = e.target.closest('[data-item]');
		if (item) {
			e.stopPropagation();
			const fullValue = item.dataset.item;
			this.toggleItem(fullValue);
			return;
		}
	}

	handleInput(e) {
		const searchInput = e.target.closest('[data-search]');
		if (searchInput) {
			const categoryName = searchInput.dataset.search;
			this.updateSearchQuery(categoryName, searchInput.value);
		}
	}

	handleClickOutside(e) {
		if (!this.container.contains(e.target) && this.state.isOpen) {
			this.closeDropdown();
		}
	}

	handleKeyDown(e) {
		// Handle Enter and Space for trigger
		const trigger = e.target.closest('[data-trigger]');
		if (trigger && (e.key === 'Enter' || e.key === ' ')) {
			e.preventDefault();
			this.toggleDropdown();
			return;
		}

		// Handle Enter and Space for items
		const item = e.target.closest('[data-item]');
		if (item && (e.key === 'Enter' || e.key === ' ')) {
			e.preventDefault();
			const fullValue = item.dataset.item;
			this.toggleItem(fullValue);
			return;
		}

		// Handle Enter and Space for category headers
		const categoryHeader = e.target.closest('[data-category-header]');
		if (categoryHeader && (e.key === 'Enter' || e.key === ' ')) {
			e.preventDefault();
			const categoryName = categoryHeader.dataset.categoryHeader;
			this.toggleCategory(categoryName);
			return;
		}

		// Handle Escape to close
		if (e.key === 'Escape' && this.state.isOpen) {
			e.preventDefault();
			this.closeDropdown();
			this.elements.trigger?.focus();
		}
	}

	toggleDropdown() {
		if (this.state.isOpen) {
			this.closeDropdown();
		} else {
			this.openDropdown();
		}
	}

	openDropdown() {
		this.state.isOpen = true;

		// Set first category as active if none selected
		if (!this.state.activeCategory && this.options.categories.length > 0) {
			this.state.activeCategory = this.options.categories[0].name;
		}

		this.update();
	}

	closeDropdown() {
		this.state.isOpen = false;
		this.update();
	}

	toggleCategory(categoryName) {
		this.state.activeCategory = this.state.activeCategory === categoryName ? null : categoryName;
		this.update();
	}

	toggleItem(fullValue) {
		const index = this.state.selectedValues.indexOf(fullValue);

		if (index > -1) {
			this.state.selectedValues.splice(index, 1);
		} else {
			this.state.selectedValues.push(fullValue);
		}

		this.options.onChange([...this.state.selectedValues]);
		this.update();
	}

	clearAll() {
		this.state.selectedValues = [];
		this.options.onChange([]);
		this.update();
	}

	countSelectedInCategory(categoryName) {
		return this.state.selectedValues.filter(v => v.startsWith(`${categoryName}:`)).length;
	}

	updateSearchQuery(categoryName, query) {
		this.state.searchQueries[categoryName] = query;
		this.update();
	}

	getFilteredItems(category) {
		const query = this.state.searchQueries[category.name] || '';
		if (!query) return category.items;

		return category.items.filter(item => item.label.toLowerCase().includes(query.toLowerCase()));
	}

	formatSelectedValues() {
		if (this.state.selectedValues.length === 0) return '';

		// Group selected values by category
		const selectedByCategory = {};

		this.options.categories.forEach(category => {
			const count = category.items.filter(item =>
				this.state.selectedValues.includes(`${category.name}:${item.value}`)
			).length;

			if (count > 0) {
				selectedByCategory[category.name] = count;
			}
		});

		// Special case for a single item selected
		if (this.state.selectedValues.length === 1) {
			const [fullValue] = this.state.selectedValues;
			const [categoryName, itemValue] = fullValue.split(':');

			for (const category of this.options.categories) {
				if (category.name === categoryName) {
					const item = category.items.find(i => i.value === itemValue);
					if (item) {
						return `${category.name} - ${item.label}`;
					}
				}
			}
		}

		// Format the display string
		const displayParts = Object.entries(selectedByCategory).map(([category, count]) => {
			const categoryLabel = category.toLowerCase();
			return count === 1 ? `1 ${categoryLabel}` : `${count} ${categoryLabel}s`;
		});

		return displayParts.join(', ');
	}

	update() {
		// Save focus state before re-render
		const activeElement = document.activeElement;
		const isSearchInput = activeElement && activeElement.closest('[data-search]');
		const cursorPosition = isSearchInput ? activeElement.selectionStart : null;
		const searchCategory = isSearchInput ? activeElement.dataset.search : null;
		
		// Re-render
		this.render();
		
		// Restore focus to search input if it was focused
		if (isSearchInput && searchCategory) {
			const searchInput = this.container.querySelector(`[data-search="${searchCategory}"]`);
			if (searchInput) {
				searchInput.focus();
				if (cursorPosition !== null) {
					searchInput.setSelectionRange(cursorPosition, cursorPosition);
				}
			}
		}
	}

	// Public API
	setValue(value) {
		this.state.selectedValues = [...value];
		this.update();
	}

	getValue() {
		return [...this.state.selectedValues];
	}

	setDisabled(disabled) {
		this.options.disabled = disabled;
		this.update();
	}

	destroy() {
		this.removeEventListeners();
		this.container.innerHTML = '';
	}
}

// Export for both module and global usage
if (typeof module !== 'undefined' && module.exports) {
	module.exports = SelectMultiCategory;
}

if (typeof window !== 'undefined') {
	window.SelectMultiCategory = SelectMultiCategory;
}
