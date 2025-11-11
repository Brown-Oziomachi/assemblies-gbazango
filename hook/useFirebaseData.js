import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';

export function useFirebaseData() {
    const [members, setMembers] = useState([]);
    const [events, setEvents] = useState([]);
    const [sermons, setSermons] = useState([]);
    const [prayerRequests, setPrayerRequests] = useState([]);
    const [visitors, setVisitors] = useState([]);
    const [reports, setReports] = useState([]);
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribes = [];

        try {
            // Members listener
            const membersQuery = query(collection(db, 'members'), orderBy('createdAt', 'desc'));
            const unsubMembers = onSnapshot(membersQuery, (snapshot) => {
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setMembers(data);
            }, (err) => {
                console.error('Members error:', err);
                setError(err.message);
            });
            unsubscribes.push(unsubMembers);

            // Events listener
            const eventsQuery = query(collection(db, 'events'), orderBy('date', 'desc'));
            const unsubEvents = onSnapshot(eventsQuery, (snapshot) => {
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setEvents(data);
            }, (err) => console.error('Events error:', err));
            unsubscribes.push(unsubEvents);

            // Sermons listener
            const sermonsQuery = query(collection(db, 'sermons'), orderBy('date', 'desc'));
            const unsubSermons = onSnapshot(sermonsQuery, (snapshot) => {
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setSermons(data);
            }, (err) => console.error('Sermons error:', err));
            unsubscribes.push(unsubSermons);

            // Prayer Requests listener
            const prayersQuery = query(collection(db, 'prayerRequests'), orderBy('timestamp', 'desc'));
            const unsubPrayers = onSnapshot(prayersQuery, (snapshot) => {
                const data = snapshot.docs.map(doc => {
                    const docData = doc.data();
                    return {
                        id: doc.id,
                        name: docData.name,
                        email: docData.email,
                        phone: docData.phone,
                        request: docData.prayerRequest || docData.request,
                        status: docData.status || 'pending',
                        date: docData.createdAt || new Date(docData.timestamp?.seconds * 1000).toISOString().split('T')[0],
                        urgent: docData.urgent || false
                    };
                });
                setPrayerRequests(data);
            }, (err) => console.error('Prayer requests error:', err));
            unsubscribes.push(unsubPrayers);

            // Contact Messages (Visitors) listener
            const visitorsQuery = query(collection(db, 'contactMessages'), orderBy('timestamp', 'desc'));
            const unsubVisitors = onSnapshot(visitorsQuery, (snapshot) => {
                const data = snapshot.docs.map(doc => {
                    const docData = doc.data();
                    return {
                        id: doc.id,
                        name: docData.name,
                        email: docData.email,
                        phone: docData.phone,
                        visitDate: docData.createdAt || new Date(docData.timestamp?.seconds * 1000).toISOString().split('T')[0],
                        interests: docData.message,
                        firstTime: true,
                        followUpStatus: 'pending'
                    };
                });
                setVisitors(data);
            }, (err) => console.error('Visitors error:', err));
            unsubscribes.push(unsubVisitors);

            // Reports listener
            const reportsQuery = query(collection(db, 'reports'), orderBy('date', 'desc'));
            const unsubReports = onSnapshot(reportsQuery, (snapshot) => {
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setReports(data);
            }, (err) => console.error('Reports error:', err));
            unsubscribes.push(unsubReports);

            // Leaders listener
            const leadersQuery = query(collection(db, 'leaders'));
            const unsubLeaders = onSnapshot(leadersQuery, (snapshot) => {
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setLeaders(data);
            }, (err) => console.error('Leaders error:', err));
            unsubscribes.push(unsubLeaders);

            setLoading(false);
        } catch (err) {
            console.error('Setup error:', err);
            setError(err.message);
            setLoading(false);
        }

        // Cleanup function
        return () => {
            unsubscribes.forEach(unsub => unsub());
        };
    }, []);

    return {
        members,
        events,
        sermons,
        prayerRequests,
        visitors,
        reports,
        leaders,
        loading,
        error
    };
}
