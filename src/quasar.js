import Vue from 'vue'

import './styles/quasar.styl'
import '@quasar/extras/material-icons/material-icons.css'

import {
    Quasar,
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QDialog,
    QCardSection,
    QSeparator,
    QSlideTransition,
    QCard,
    QBtnToggle,
    QDate,
    QSlideItem,
    QInput,
    QPopupProxy,
    ClosePopup,
    QTime,
    Notify,
    QImg

} from 'quasar'

Vue.use(Quasar, {
    config: {
        ClosePopup,
        notify: { /* look at QUASARCONFOPTIONS from the API card (bottom of page) */}

    },
    components: {
        QLayout,
        QHeader,
        QDrawer,
        QPageContainer,
        QPage,
        QToolbar,
        QToolbarTitle,
        QBtn,
        QIcon,
        QList,
        QItem,
        QItemSection,
        QItemLabel,
        QDialog,
        QCardSection,
        QSeparator,
        QSlideTransition,
        QCard,
        QBtnToggle,
        QDate,
        QSlideItem,
        QInput,
        QPopupProxy,
        QTime,
        ClosePopup,
        QImg

    },
    directives: {
        ClosePopup,
    },
    plugins: {
        Notify
    }
})
