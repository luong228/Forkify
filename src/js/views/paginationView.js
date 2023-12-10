import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');
    _errorMessage = 'No recipes found for your query. Please try again!';
    _message = '';

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn--inline');

            if(!btn) return;
            
            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        })
    }

    _generateMarkup() {
        const curPage = +this._data.currentPage;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        // Page 1, and there are other pages
        if (curPage === 1 && numPages > 1) {
            return this._generateMarkupButton(curPage, false, true);
        }

        // Page 1, and there are NO other pages
        if (curPage === 1 === numPages) {
            return ''
        }

        // Last page
        if (curPage === numPages && numPages > 1) {
            return this._generateMarkupButton(curPage, true, false);
        }
        // Other pages
        if (curPage < numPages && curPage !== 1) {
            return this._generateMarkupButton(curPage, true, true);
        }
    }
    _generateMarkupButton(curPage, prev = false, next = false) {
        const prevBtn = `
            <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button>`;

        const nextBtn = `
                <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
                </button>`;
        if (prev && next)
            return prevBtn.concat(nextBtn)

        if (prev) return prevBtn;

        return nextBtn;
    }
}

export default new PaginationView();