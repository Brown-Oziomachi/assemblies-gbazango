import { collection, addDoc, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';

export const firebaseService = {
    // Members
    async addMember(memberData) {
        try {
            const docRef = await addDoc(collection(db, 'members'), {
                ...memberData,
                status: 'active',
                createdAt: new Date().toISOString(),
                timestamp: Timestamp.now()
            });
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error('Error adding member:', error);
            return { success: false, error: error.message };
        }
    },

    async updateMember(id, data) {
        try {
            await updateDoc(doc(db, 'members', id), data);
            return { success: true };
        } catch (error) {
            console.error('Error updating member:', error);
            return { success: false, error: error.message };
        }
    },

    async deleteMember(id) {
        try {
            await deleteDoc(doc(db, 'members', id));
            return { success: true };
        } catch (error) {
            console.error('Error deleting member:', error);
            return { success: false, error: error.message };
        }
    },

    // Events
    async addEvent(eventData) {
        try {
            const docRef = await addDoc(collection(db, 'events'), {
                ...eventData,
                createdAt: new Date().toISOString(),
                timestamp: Timestamp.now()
            });
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error('Error adding event:', error);
            return { success: false, error: error.message };
        }
    },

    async updateEvent(id, data) {
        try {
            await updateDoc(doc(db, 'events', id), data);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    async deleteEvent(id) {
        try {
            await deleteDoc(doc(db, 'events', id));
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Sermons
    async addSermon(sermonData) {
        try {
            const docRef = await addDoc(collection(db, 'sermons'), {
                ...sermonData,
                date: new Date().toISOString().split('T')[0],
                createdAt: new Date().toISOString(),
                timestamp: Timestamp.now()
            });
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error('Error adding sermon:', error);
            return { success: false, error: error.message };
        }
    },

    // Prayer Requests
    async updatePrayerStatus(id, status) {
        try {
            await updateDoc(doc(db, 'prayerRequests', id), { status });
            return { success: true };
        } catch (error) {
            console.error('Error updating prayer:', error);
            return { success: false, error: error.message };
        }
    },

    // Reports
    async addReport(reportData) {
        try {
            const docRef = await addDoc(collection(db, 'reports'), {
                ...reportData,
                date: new Date().toISOString().split('T')[0],
                status: 'pending',
                createdAt: new Date().toISOString(),
                timestamp: Timestamp.now()
            });
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error('Error adding report:', error);
            return { success: false, error: error.message };
        }
    },

    // Leaders
    async addLeader(leaderData) {
        try {
            const docRef = await addDoc(collection(db, 'leaders'), {
                ...leaderData,
                createdAt: new Date().toISOString(),
                timestamp: Timestamp.now()
            });
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error('Error adding leader:', error);
            return { success: false, error: error.message };
        }
    }
};