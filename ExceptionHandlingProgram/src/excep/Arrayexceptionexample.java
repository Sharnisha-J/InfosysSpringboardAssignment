package excep;
import java.util.*;
public class Arrayexceptionexample {

	public static void main(String[] args) {
		Scanner sc=new Scanner(System.in);
		int n=sc.nextInt();
		int[] arr=new int[n];
		for(int i=0;i<n;i++) {
			arr[i]=sc.nextInt();
		}
		try {
            System.out.println(arr[5]); 
        }
		catch(ArrayIndexOutOfBoundsException e) {
            System.out.println("Error: Invalid array index!");
        }
	}

}
