public class SingleLinkedListTest {

    static class Node {
        int data;
        Node next;

        public Node(int data) {
            this.data = data;
            this.next = null;
        }
    }

    static class SingleLinkedList {
        Node head;

        public SingleLinkedList() {
            head = null;
        }

        // insertTail
        public void insertAtEnd(int data) {
            Node newNode = new Node(data);
            if (head == null) {
                head = newNode;
                return;
            }
            Node current = head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = newNode;
        }

        // insertHead
        public void insertAtBeginning(int data) {
            Node newNode = new Node(data); //{10,{}} >> {10,{Head}} >> 
            newNode.next = head;
            head = newNode;
        }

        // Delete by value
        public void deleteByValue(int data) {
            if (head == null) return;

            if (head.data == data) {
                head = head.next;
                return;
            }

            Node current = head;
            while (current.next != null && current.next.data != data) {
                current = current.next;
            }

            if (current.next != null) {
                current.next = current.next.next;
            }
        }

        // 4. Display
        public void display() {
            Node current = head;
            while (current != null) {
                System.out.print(current.data + " -> ");
                current = current.next;
            }
            System.out.println("null");
        }
    }

    // Fungsi main untuk menguji
    public static void main(String[] args) {
        SingleLinkedList list = new SingleLinkedList();

        System.out.println("Insert at end: 2, 7, 11");
        list.insertAtEnd(2); // input Node {2, {}} head = {2,{}}
        list.insertAtEnd(7); // newNode {7, {}}, while skip {2,{}}, Node current = head; current {2,{}}, current.next = newNode >> {2,{7,{}}}
        list.insertAtEnd(11);// newNode {11,{}} Node Current = head {2,{7,{}}}, while 2.next 7.next, current 7.next, current.next = newNode 7.11.{}
        list.display(); 

        System.out.println("\nInsert at beginning: 9");
        list.insertAtBeginning(9);
        list.display(); 

        System.out.println("\nDelete by value: 20");
        list.deleteByValue(20);
        list.display(); 

        System.out.println("\nDelete by value: 5 (head)");
        list.deleteByValue(5);
        list.display();
    }
}