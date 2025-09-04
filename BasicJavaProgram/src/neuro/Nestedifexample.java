package neuro;
import java.util.*;
public class Nestedifexample {

	public static void main(String[] args) {
		Scanner sc=new Scanner(System.in);
		int num=sc.nextInt();
		if(num!=0) {
			if(num>0) {
				System.out.println("Positive Number");
			}
			else {
				System.out.println("Negative Number");
			}
		}
		else {
			System.out.println("Number is zero");
		}
	}

}
