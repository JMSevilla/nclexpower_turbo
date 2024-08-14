import StarterKit from '@tiptap/starter-kit'
import { Table } from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Underline from '@tiptap/extension-underline'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'

export const extensions = [
    ListItem,
    StarterKit.configure({
        heading: {
            HTMLAttributes: {
                class: 'text-xl font-bold font-primary'
            }
        },
        listItem: false,
        bulletList: false,
        orderedList: false,
    }),
    BulletList.configure({
        keepMarks: true,
        HTMLAttributes: {
            class: 'list-disc mx-6'
        }
    }),
    OrderedList.configure({
        keepMarks: true,
        HTMLAttributes: {
            class: 'list-decimal mx-6 '
        }
    }),
    Table.configure({
        resizable: true,
        HTMLAttributes: {
            class: 'border border-collapse w-full table-fixed m-0',
        },
    }),
    Underline,
    TableRow.configure({
        HTMLAttributes: {
            class: 'border'
        }
    }),
    TableHeader.configure({
        HTMLAttributes: {
            class: 'border bg-black/30 '
        }
    }),
    TableCell.configure({
        HTMLAttributes: {
            class: 'border align-top'
        }
    }),
]