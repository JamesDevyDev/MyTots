import { create } from 'zustand'


interface InteractionStore {
    currentComment: any[];

    getComments: ({ PostId }: { PostId: string }) => Promise<any>
    addComment: ({ CommenterId, PostId, comment }: { CommenterId: string, PostId: string, comment: string }) => Promise<any>
}

const useInteractionStore = create<InteractionStore>((set, get) => ({
    currentComment: [],
    getComments: async ({ PostId }: { PostId: string }) => {
        try {
            let res = await fetch('/api/comment', {
                method: 'PATCH',
                body: JSON.stringify({ PostId })
            })
            if (!res.ok) return { error: 'User already exist or error.' }
            const data = await res.json()
            set({ currentComment: data })

            return data
        } catch (error) {
            console.log(error)
        }
    },
    addComment: async ({ CommenterId, PostId, comment }: { CommenterId: string, PostId: string, comment: string }) => {
        try {
            let res = await fetch('/api/comment', {
                method: 'POST',
                body: JSON.stringify({ CommenterId, PostId, comment })
            })
            if (!res.ok) return { error: 'User already exist or error.' }
            const data = await res.json()
            return data


        } catch (error) {
            console.log(error)
        }
    }


}))

export default useInteractionStore