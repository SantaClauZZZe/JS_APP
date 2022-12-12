const App = {
    data() {
      return {
        note_title : '',
        title : '',
        description : '',
        notes_data : [],
        is_edit : false,
        is_local: true,
      }
    },
    mounted() {
        if (localStorage.getItem('notes'))
        {
            try {
                this.notes_data = JSON.parse(localStorage.getItem('notes'))
            }
            catch (e) {
                localStorage.removeItem('notes')
            }
        }
        else {
            this.notes_data = [
                                {id : '1', title: 'Пример заметки 1', description : 'Описание заметки 1', completed : false},
                                {id : '2', title: 'Пример заметки 2', description : 'Описание заметки 2', completed : false},
                                {id : '3', title: 'Пример заметки 3', description : 'Описание заметки 3', completed : false},
            ]
            this.is_edit = true
            this.is_local = false
        }
    },
    methods: {
        removeNote(id) {
            this.notes_data = this.notes_data.filter(it => it.id != id)
            this.is_edit = true
        },
        addNote() {
            if (this.title.trim())
            {
                const newNote = {
                    id : Date.now(),
                    title : this.title.trim(),
                    description : this.description.trim(),
                    completed : false,
                }

                this.notes_data.push(newNote)

                this.title = ''
                this.description = ''

                this.is_edit = true
            }
        },
        saveNotes_in_local() {
            const parsed = JSON.stringify(this.notes_data)
            localStorage.setItem('notes', parsed)

            this.is_edit = false
            this.is_local = true
        },
        removeNotes_from_local() {
            localStorage.clear()
            
            this.is_edit = true
            this.is_local = false
        },
        removeAllNotes() {
            localStorage.clear()

            this.notes_data = []
            
            this.is_edit = false
            this.is_local = false
        },
        changed() {
            this.is_edit = true
        }
    },
    computed: {
        needToSave() {
            return this.is_edit
        },
        isLocal() {
            return this.is_local
        },
        isEmpty() {
            return !this.is_local && !this.notes_data.length
        },
    }
  }

Vue.createApp(App).mount('.app');